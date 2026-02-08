import fitz  # Import the PyMuPDF library (its import name in Python is 'fitz')

def text_extraction_from_pdf(file_path):
    # file_path → string path to the PDF file (example: "C:/docs/resume.pdf")

    doc = fitz.open(file_path)
    # Opens the PDF file and creates a Document object we can read page by page

    text_parts = []
    # Empty list to store text extracted from each page

    for page in doc:
        # Loop through every page in the PDF document
        
        text_parts.append(page.get_text("text"))
        # Extract readable text from the current page
        # "text" tells PyMuPDF to return plain text layout
        # Append that page's text into the list

    doc.close()
    # Close the PDF file to free memory/resources (good practice)

    return "\n".join(text_parts).strip()
    # "\n".join(text_parts) → Combine all page texts into one string,
    #                         separated by new lines between pages
    # .strip() → Remove extra spaces or blank lines from start and end
