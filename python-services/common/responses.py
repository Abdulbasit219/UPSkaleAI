from typing import Any, Dict


def ok(data: Any = None, message: str = "ok") -> Dict:
return {"status": "ok", "message": message, "data": data}


def error(message: str, code: int = 500):
return {"status": "error", "message": message, "code": code}