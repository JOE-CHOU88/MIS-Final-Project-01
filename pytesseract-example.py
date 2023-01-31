import sys
import json
import pytesseract
try:
    from PIL import Image
except ImportError:
    import Image

pytesseract_result = ""

# 列出支持的语言
# print(pytesseract.get_languages(config=''))

# 支援語言：英文、中文(簡體+繁體)、日文
# print(pytesseract.image_to_string(Image.open('house-number.jpg'), lang='eng+chi_sim+chi_sim_vert+chi_tra+chi_tra_vert+jpn+jpn_vert'))
pytesseract_result = {"result": pytesseract.image_to_string(Image.open('house-number.jpg'), lang='eng+chi_sim+chi_sim_vert+chi_tra+chi_tra_vert+jpn+jpn_vert')}

json = json.dumps(pytesseract_result)

print(str(json))

sys.stdout.flush()

# import sys 
# import json

# result = {
#     "Name": sys.argv[1],
#     "From": sys.argv[2]
#   }

# json = json.dumps(result)

# print(str(json))

# sys.stdout.flush()

