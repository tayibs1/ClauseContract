from fastapi import FastAPI, UploadFile
from fastapi.responses import FileResponse
import markdown, pdfkit

from agent.agent_analyser import AnalyserAgent

app = FastAPI()

@app.get('/')
def read_root():
    return {"hello": "world"}

def md_to_pdf(md, filepath):
    html = markdown.markdown(md)
    pdfkit.from_string(html, filepath)

@app.get('/getfile/{filename}')
async def get_file(filename: str):
    return FileResponse(filename, media_type='application/pdf', filename='hello.pdf')

@app.post('/changme')
async def file_analysis(file: UploadFile):
    filepath = f'firestore/{file.filename}'

    with open(filepath, 'wb') as f:
        f.write(await file.read())


    # run ai function
    is_reasonable = is_file_reasonable_magic_ai(filepath)

    if if_reasonable:
        ai_magic_contract = magically_generate_contact(filepath)
        # TODO: save this as pdf
        md_to_pdf(ai_magic_contract, 'filestore')

        return {
                "status": "success",
                "contract": ai_magic_contract
                "filename": "hello"
                }
    else:
        return {
                "status": "error" ,
                "message": "File is not reaonable",
                "reason": is_reasonable.reason
                }



    return {'message': 'file succesfully created', "anlysis": ai_response}

