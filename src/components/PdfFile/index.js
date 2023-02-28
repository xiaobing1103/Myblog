import React,{ useEffect, useState }  from "react";
import './pdf.css'
const PDFJS = require('pdfjs-dist')
PDFJS.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.5.207/pdf.worker.js'
console.log("成功：",PDFJS )
function PdfFile({src,bsrc}){
    return (
        <>
         <div class="preview-pdf">
           <h1>PDF在线预览</h1>
           <div style={`width:${pdfWidth}`}>
           {pafPages.map((page,index)=>{
            return <canvas
            key={page}
            id={'pdfCanvas'+page}
            >
            </canvas>       
            })}  
           </div>
         </div>
        </>
      );
}

export default PdfFile;
