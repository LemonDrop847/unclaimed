from flask import Flask, request, jsonify
from flask_cors import CORS
import qrcode
import base64
from io import BytesIO
from PIL import Image, ImageDraw, ImageFont

app = Flask(__name__)
CORS(app)

def qr_gen(data, object_name):
    qr = qrcode.QRCode(
        version=2,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=2,
    )
    qr.add_data(data)
    qr.make(fit=True)
    qr_img = qr.make_image(fill_color="black", back_color="white").convert("RGBA")
    qr_size = (460,460)
    qr_img=qr_img.resize(qr_size,Image.NEAREST)

    # Add Logo
    logo=Image.open("/home/LemonDrop47/mysite/fonts/logo.png")
    lwidth = 70
    aspect_ratio = (lwidth/float(logo.size[0]))
    lheight = int((float(logo.size[1])*float(aspect_ratio)))
    logo=logo.resize((lwidth, lheight))
    pos = ((460 - logo.size[0]) // 2,
       (460 - logo.size[1]) // 2)
    qr_img.paste(logo, pos)

    # Final Image

    final_img = Image.open("/home/LemonDrop47/mysite/fonts/qrtemplate.png")
    width,height=final_img.size
    final_img.paste(qr_img, (70, 80), qr_img)
    draw = ImageDraw.Draw(final_img)
    font_size = 50
    name_font = ImageFont.truetype("/home/LemonDrop47/mysite/fonts/Avenir.ttf", size=font_size)
    while draw.textsize(object_name, font=name_font)[0] > width - 80:
        font_size -= 1
        name_font = ImageFont.truetype("/home/LemonDrop47/mysite/fonts/Avenir.ttf", size=font_size )
    text_width, text_height = draw.textsize(object_name, font=name_font)
    draw.text(((width - text_width) / 2, height - text_height - 210), object_name, font=name_font, fill=(0,0,0))
    final_img.save("qrcode.png")
    buffer = BytesIO()
    final_img.save(buffer, format='PNG')
    img_str = base64.b64encode(buffer.getvalue()).decode()
    return jsonify({"image": img_str})

@app.route('/generate_qr_code', methods=['GET','POST'])
def generate_qr_code():
    data = request.json.get("data")
    object_name = request.json.get("object_name")
    return qr_gen(data, object_name)

if __name__ == '__main__':
    app.run(debug=True)