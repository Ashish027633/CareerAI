import pytest
import fitz
from app.services.pdf_parser import extract_text_from_pdf

def create_synthetic_pdf(text: str, num_pages: int = 1) -> bytes:
    doc = fitz.open()
    for i in range(num_pages):
        page = doc.new_page()
        page.insert_text((50, 50), f"{text} - Page {i+1}")
    pdf_bytes = doc.tobytes()
    doc.close()
    return pdf_bytes

def test_extract_text_valid_pdf():
    pdf_bytes = create_synthetic_pdf("John Doe\nPython Java Spring Boot Developer", num_pages=1)
    res = extract_text_from_pdf(pdf_bytes)
    assert res["success"] is True
    assert "Python Java Spring Boot Developer" in res["text"]
    assert res["page_count"] == 1

def test_extract_text_multipage_pdf():
    pdf_bytes = create_synthetic_pdf("Experienced Senior Developer with React and AWS skills", num_pages=3)
    res = extract_text_from_pdf(pdf_bytes)
    assert res["success"] is True
    assert res["page_count"] == 3

def test_extract_text_empty_pdf():
    # PDF with empty text
    doc = fitz.open()
    doc.new_page()
    pdf_bytes = doc.tobytes()
    doc.close()
    res = extract_text_from_pdf(pdf_bytes)
    assert res["success"] is False
    assert "Unable to extract readable text" in res["error"]

def test_extract_text_corrupted_bytes():
    res = extract_text_from_pdf(b"Not a real PDF header content")
    assert res["success"] is False
    assert "Invalid or corrupted PDF" in res["error"]
