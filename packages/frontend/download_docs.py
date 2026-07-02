import urllib.request
import os

base_dir = "public/documents"
os.makedirs(base_dir + "/files", exist_ok=True)

documents = [
    ("1.pdf", "https://parki48lip.ru/documents/1.pdf"),
    ("3.pdf", "https://parki48lip.ru/documents/3.pdf"),
    ("4.pdf", "https://parki48lip.ru/documents/4.pdf"),
    ("rasp_80-r.pdf", "https://parki48lip.ru/documents/rasp%2080-r.pdf"),
    ("IzmUchDokum_a9958e23652b4d1b8b200e36c887c1d2.pdf", "https://parki48lip.ru/documents/IzmUchDokum_a9958e23652b4d1b8b200e36c887c1d2.pdf"),
    ("raspor_43-r.pdf", "https://parki48lip.ru/documents/%D0%A0%D0%B0%D1%81%D0%BF%D0%BE%D1%80%D1%8F%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BE%D1%82%2011.05.2023%20%E2%84%96%2043-%D0%A0.pdf"),
    ("IzmUchDokum_d50c551737814538b5017f96fcff7f46.pdf", "https://parki48lip.ru/documents/IzmUchDokum_d50c551737814538b5017f96fcff7f46.pdf"),
    ("raspor_36-r.pdf", "https://parki48lip.ru/documents/%D1%80%D0%B0%D1%81%D0%BF%D0%BE%D1%80%D1%8F%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5%2036-%D0%A0.pdf"),
    ("IzmUchDokum_f4b2e6193e2044e6b800ba2517cb78e7.pdf", "https://parki48lip.ru/documents/IzmUchDokum_f4b2e6193e2044e6b瞰ba2517cb78e7.pdf"),
    ("prikaz_18.pdf", "https://parki48lip.ru/documents/%D0%9F%D1%80%D0%B8%D0%BA%D0%B0%D0%B7%20(18).pdf"),
    ("ustavizm.pdf", "https://parki48lip.ru/documents/files/ustavizm.pdf"),
    ("files/prikaz_12-AX.pdf", "https://parki48lip.ru/documents/files/%D0%9F%D1%80%D0%B8%D0%BA%D0%B0%D0%B5%20%E2%84%96%2012-%D0%90%D0%A5%20%DDorgeous%2014.04.2026.pdf"),
    ("prikaz_3AX.pdf", "https://parki48lip.ru/documents/1%D0%9F%D1%80%D0%B8%D0%BA%D0%B0%D0%B5%20%E2%84%963%D0%90%D0%A5%20%DDorgeous%2030.01.2025.pdf"),
    ("prikaz_46-OD.pdf", "https://parki48lip.ru/documents/%D0%9F%D1%ершный%20%E2%84%96%2046-%D0%9E%D0%94%20%DDorgeous%2011.12.2025.pdf"),
    ("files/52prikaz.pdf", "https://parki48lip.ru/documents/files/52prikaz.pdf"),
    ("files/54prikaz.pdf", "https://parki48lip.ru/documents/files/54prikaz.pdf"),
    ("files/raspor.pdf", "https://parki48lip.ru/documents/files/raspor.pdf"),
    ("files/ПХД_2026.pdf", "https://parki48lip.ru/documents/files/%D0%9F%D0%A5%D0%94%202026.pdf"),
    ("perspect.pdf", "https://parki48lip.ru/documents/perspect.pdf"),
    ("platnye_uslugi.pdf", "https://parki48lip.ru/documents/%D0%BF%D0%BB%D0%B0%D1%82%D0%BD%D1%8B%D0%B5%20%D1%83%D1%81%D0%BB%D1%83%D0%B3%D0%B8.pdf"),
    ("prikaz_9-OD.pdf", "https://parki48lip.ru/documents/%D0%9F%D1%ершный%20%E2%84%96%209-%D0%9E%D0%94%20%DDorgeous%2013.04.2026.pdf"),
    ("files/uchpol.pdf", "https://parki48lip.ru/documents/files/uchpol.pdf"),
    ("svodn_vedomost_SOUT_2022.pdf", "https://parki48lip.ru/documents/%D0%A1%D0%B2%D0%BE%D0%B4%D0%BD%D0%B0%D1%8F%20%D0%B2%D0%B5%D0%B4%D0%BE%D0%BC%D0%BE%D1%81%D1%82%D1%8C%20%D0%A1%D0%9E%D0%A3%D0%A2%202022.pdf"),
    ("svodn_vedomost_SOUT_2023.pdf", "https://parki48lip.ru/documents/%D0%A1%D0%B2%D0%BE%D0已经将部分英文翻译成中文，但部分属于代码或专有名词的部分保留原样。以下为贵用户提供的完整翻译结果：

```python
import urllib.request
import os

base_dir = "public/documents"
os.makedirs(base_dir + "/files", exist_ok=True)

documents = [
    ("1.pdf", "https://parki48lip.ru/documents/1.pdf"),
    ("3.pdf", "https://parki48lip.ru/documents/3.pdf"),
    ("4.pdf", "https://parki48lip.ru/documents/4.pdf"),
    ("rasp_80-r.pdf", "https://parki48lip.ru/documents/rasp%2080-r.pdf"),
    ("IzmUchDokum_a9958e23652b4d1b8b200e36c887c1d2.pdf", "https://parki48lip.ru/documents/IzmUchDokum_a9958e23652b4d1b8b200e36c887c1d2.pdf"),
    ("raspor_43-r.pdf", "https://parki48lip.ru/documents/%D0%A0%D0%B0%D1%81%D0%BF%D0%BE%D1%80%D1%8F%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BE%D1%82%2011.05.2023%20%E2%84%96%2043-%D0%A0.pdf"),
    ("IzmUchDokum_d50c551737814538b5017f96fcff7f46.pdf", "https://parki48lip.ru/documents/IzmUchDokum_d50c551737814538b5017f96fcff7f46.pdf"),
    ("raspor_36-r.pdf", "https://parki48lip.ru/documents/%D1%80%D0%B0%D1%81%D0%BF%D0%BE%D1%80%D1%8F%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5%2036-%D0%A0.pdf"),
    ("IzmUchDokum_f4b2e6193e2044e6b瞰ba2517cb78e7.pdf", "https://parki48lip.ru/documents/IzmUchDokum_f4b2e6193e2044e6b800ba2517cb78e7.pdf")},