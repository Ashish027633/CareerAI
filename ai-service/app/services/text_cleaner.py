import re

def clean_text(raw_text: str) -> str:
    """
    Normalizes text extracted from PDF while preserving tech tokens
    such as C++, C#, .NET, Node.js, React.js, Spring Boot, scikit-learn, SQL.
    """
    if not raw_text:
        return ""

    # Replace non-standard unicode whitespace and non-breaking spaces with normal space
    text = raw_text.replace("\u00a0", " ").replace("\r\n", "\n").replace("\r", "\n")

    # Replace bullet points and non-ASCII bullet characters with standard dash or line separator
    text = re.sub(r'[\u2022\u2023\u25b6\u25c0\u25cf\u25cb\u25a0\u25a1\u25aa\u25ab]', '\n- ', text)

    # Normalize repeated horizontal separators (like ---, ===, ____)
    text = re.sub(r'[-=_]{3,}', '\n', text)

    # Clean multi-space sequences within lines without collapsing newlines
    lines = text.split('\n')
    cleaned_lines = []
    for line in lines:
        cleaned_line = re.sub(r'[ \t]+', ' ', line).strip()
        cleaned_lines.append(cleaned_line)

    joined = "\n".join(cleaned_lines)
    # Collapse 3+ newlines into double newlines
    normalized = re.sub(r'\n{3,}', '\n\n', joined).strip()
    return normalized
