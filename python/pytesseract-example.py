import base64
import sys
import json
import pytesseract
import requests
from io import BytesIO
try:
    from PIL import Image
except ImportError:
    import Image

pytesseract_result = ""

# 列出支持的语言
# print(pytesseract.get_languages(config=''))

# 不是所有的url都可以進來分析，請避免http開頭的網址，否則會跳 UnidentifiedImageError
response = requests.get(sys.argv[2], stream = True)
if(sys.argv[1]=="index"):
    with open('index-img-input.jpg', 'wb') as f:
        f.write(response.content)
    with open('./index-img-input.jpg', 'rb') as f:
        img = Image.open(BytesIO(f.read()))
if(sys.argv[1]=="setupSrcPath"):
    with open('setupSrcPath-img-input.jpg', 'wb') as f:
        f.write(response.content)
    with open('./setupSrcPath-img-input.jpg', 'rb') as f:
        img = Image.open(BytesIO(f.read()))

# 支援語言：英文、中文(簡體+繁體)、日文
pytesseract_result = {"result": pytesseract.image_to_string(img, lang='eng+chi_sim+chi_sim_vert+chi_tra+chi_tra_vert+jpn+jpn_vert')}


json = json.dumps(pytesseract_result)

print(str(json))

sys.stdout.flush()

