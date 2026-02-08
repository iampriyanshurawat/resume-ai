import os
import json
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def analyze_resume_vs_jd(resume_text: str, jd_text: str) -> dict:
    json_schema = {
        "type": "object",
        "properties": {
            "score": {"type": "integer", "minimum": 0, "maximum": 100},
            "matching_skills": {"type": "array", "items": {"type": "string"}},
            "missing_skills": {"type": "array", "items": {"type": "string"}},
            "suggestions": {"type": "string"},
        },
        "required": ["score", "matching_skills", "missing_skills", "suggestions"],
        "additionalProperties": False,
    }

    prompt = f"""
You are an experienced hiring evaluator.

Your job is to compare a candidate's RESUME against a JOB DESCRIPTION and assess how well the candidate fits THIS specific role.

Evaluate based only on what the job description asks for. Do not assume the role is technical unless the JD clearly indicates that.

Hard rules:
1) Be evidence-based. Only call something "matching" if the resume text clearly supports it.
2) Do NOT say “missing key phrase”. Think in terms of missing experience or missing evidence.
3) matching_skills must be 5–8 items max. Each item must follow this format:
   "<requirement> — Evidence: <short proof from resume (project/role/section)>"
4) missing_skills must be 3–6 items max. Each item must follow this format:
   "<requirement> — Why it matters: <short> — Fix: <one action>"
5) suggestions must be exactly 3 bullet points, each starting with "- ".
   Each bullet must include a concrete rewrite example tailored to THIS role.
6) Score meaning:
   90–100: strong fit
   75–89: good fit with minor gaps
   50–74: partial fit
   0–49 : weak fit
   The score must match the strengths and gaps you identified.

Return ONLY valid JSON matching the schema.

RESUME:
{resume_text}

JOB DESCRIPTION:
{jd_text}
""".strip()

    resp = client.responses.create(
        model="gpt-4o-mini",
        input=prompt,
        text={
            "format": {
                "type": "json_schema",
                "name": "resume_match_analysis",
                "strict": True,
                "schema": json_schema,
            }
        },
    )

    data = json.loads(resp.output_text)
    return {"data": data, "raw": resp.model_dump()}
