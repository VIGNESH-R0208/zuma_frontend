
import axios from 'axios';
import { AiOutlineSearch } from 'react-icons/ai';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import { HiOutlineDocumentPlus } from 'react-icons/hi2';
import { HiOutlineDocumentMinus } from 'react-icons/hi2';
import { ReactDialogBox } from 'react-js-dialog-box'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-js-dialog-box/dist/index.css'


import { useState } from 'react';

import './App.css';

import React from "react";


function App() {
  const url="https://zuma-task-backendd.onrender.com/document"


  const[openModal,setOpenModal]=useState(false)
  const[openModalDelete,setOpenModalDelete]=useState(false)
  const[searchButtonactivate,setsearchButtonactivate]=useState(false)
  const[searchText,setsearchText]=useState('')
  const[filterResult,setfilterResult]=useState([{item:''}])
 
  const[addDocument,setaddDocument]=useState({

    path:"",
    document:{
      text:""
    }
  })
 

  const[deleteDocumentpath,setDeleteDocumentPath]=useState('')
  

  const handleDeleteDocument=(e)=>{
    setDeleteDocumentPath(e.target.value)
    //console.log(e.target.value)

 }
 
  const handleAddData=(e,id)=>{
     
     const newAddData={...addDocument}
     if (id === "path")
     {
      newAddData.path=e.target.value
     }
     if(id ==="doc")
     {
      newAddData.document.text=e.target.value
     }
    
     setaddDocument(newAddData)
     //console.log(newAddData)

  }
  
  async function submitSearchDocument(event){
    event.preventDefault()
    
    await fetch(`${url}?path=${searchText}`,{
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin' ,
      headers: {
          'content-type': 'application/json'
      },
  }).then((res =>{
    ////console.log(res)
       
  
    res.json().then(data=>{
      //console.log(data)
    })
  }))
  
    
 }
  async function submitDeletedDocument(event){
    event.preventDefault()
    await fetch(`${url}?path=${deleteDocumentpath}`,{
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin' ,
      headers: {
          'content-type': 'application/json'
      },
     

  }).then((res =>{
    //console.log(res)
    if(res.status === 200)
           {

            toast.success('Document Deleted successfully')
           }
           else if(res.status === 502)
           {
              //console.log(res)
            toast.error('Path Does Not Exist')
           }
           else if(res.statusText ==='Bad Request')
           {
              //console.log(res.status === 400)
            toast.error('Path is Missing')
           }
       //console.log(res.statusText)
  
    res.json()
  }))
     setOpenModalDelete(false)
     setDeleteDocumentPath('')
 }
 
  async function submitDocument(event){
     event.preventDefault();
     //console.log(addDocument.path)
     //console.log(addDocument.document.text)
       await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin' ,

            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(addDocument)

        }).then((res =>{
          //console.log(res)
           if(res.status === 200)
           {

            toast.success('Document added successfully')
           }
           else if(res.status === 409)
           {
            //console.log(res)
            toast.error('Document with this path already exists')
           }
           else if(res.status === 500)
           {
              //console.log(res)
            toast.error('INTERNAL SERVER ERROR'+ res.status)
           }
           //console.log(res.statusText)
        
          res.json()
        }))
          // .then(data => {
          //   //console.log(data)
          //   //console.log()
          // })
          .catch(function (erro) {
            //console.log(erro);
        });
      // axios.post (url,{
      //   path:addDocument.path,
      //   document:addDocument.document
      // }).then(res =>{
      //   //console.log(res.data)
      // })
      setOpenModal(false)
      setaddDocument({  path:"",
                           document:{
                            text:""
                         }})  
  }


  
  async function displaySearch(e){
 
    
    setsearchButtonactivate(true)
    await fetch(`${url}?path=${e}`,{
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin' ,
      headers: {
          'content-type': 'application/json'
      },
  }).then((res =>{
    //console.log(res)
       
  
    res.json().then(data=>{
      //console.log(data.data)
      setfilterResult(data.data)
      
    })
  }))

    
 }






  

  return (
    <div>
    <div className="flex items-center justify-center h-screen">
      <div className=" shadow-md rounded w-2/3 pt-6 pb-8 mb-4">
      
        <div className=" px-10 ">
        
          <div>
            

          </div>

           <div class="flex justify-end ... pt-6 ">

           <div  className="relative w-full ">
            <form  onSubmit={submitSearchDocument}>
            <input
             style={{borderRadius:25,fontSize:'18px'}} value={searchText}  onChange={e=>{
    
             setsearchText(e.target.value)
             displaySearch(e.target.value)} }id="search"  name="search" class="  pl-8  rounded-lg  px-10  text-black w-full bg-white pl-2 peer h-14 w-full border-b-2 border-gray-300 text-gray-900  focus:outline-none focus:border-blue-900 peer-placeholder-shown:top-1 italic peer-focus:-top-12  pl-2 peer-focus: text-black peer-focus:text-3xl font-semibold" placeholder="Search Documents" />
              
              <button
          
              onClick={()=>{ 
                setsearchButtonactivate(false)
              }}
               type='submit'
                className="absolute font-semibold inset-y-0 right-0 px-3 py- text-white font-bold rounded-lg"
                
              >
               <AiOutlineCloseCircle  className='text-black '/>
            
              </button>
              <button
              onClick={()=>{
                setsearchButtonactivate(true)
              }}
               type='submit'
                className="absolute inset-y-0 left-0 px-2 py- text-white font-bold rounded-lg"
                
              >
               <AiOutlineSearch className='text-black'/>
            
              </button>
              </form>
            </div>
     
             <div class=" bg-white rounded-full mr-4  ml-3">
             <button onClick={()=>{setOpenModal(true) }} class="rounded-full... p-3 text-center ">
             <HiOutlineDocumentPlus size={24}  />
             </button>
             </div>
             <div class=' bg-white rounded-full'>
             <button onClick={()=>{setOpenModalDelete(true)}} class="rounded-full... p-3 text-center ">
             <HiOutlineDocumentMinus size={24}/> 
             </button>
             </div>
             <div>
             <button class="rounded-full ..."></button>
             </div>
             
  
            </div>
            {searchButtonactivate && (
            <table   class="  mt-3 ml-1 w-5/6">
  
  <thead   class="bg-white ">
    <tr  >

  
       {  filterResult?.map((item) => (
          <div >
         <thead   class="bg-white ">
        <tr>
        <td  class="pl-4 italic font-semibold">{item.text}</td>
        </tr>
       </thead>
        </div>
      ))}
      
     

    </tr>

  </thead>
  
 
</table> 
        )}
          
        </div>
 
     <div>
    
</div>
      </div>
      {openModal && (
          <>
          <ReactDialogBox
               closeBox={()=>{setOpenModal(false)}}
              modalWidth='35%'
              headerBackgroundColor='white'
              headerTextColor='Black'
              headerHeight='70px'
              closeButtonColor='black'
              bodyBackgroundColor='white'
              bodyTextColor='black'
              bodyHeight='260px'
              headerText= <h2 class="px-2 py-7"></h2>
            
            >
              <div>
              <div  className="relative w-full ">
      
                  
            <form onSubmit={submitDocument} class="w-full max-w-sm">
  <div class="md:flex md:items-center mb-6  ">
    <div class="md:w-1/3">
      <label   class="block text-black italic font-bold md:text-right mb-1 md:mb-0 pr-6" for="inline-full-name">
        Path :
      </label>
    </div>
    <div class="md:w-5/6">
      <input id="path" onChange={e=> handleAddData(e,"path")} value={addDocument.path} type="text" pattern='^[a-zA-Z0-9/]*$'  name="search" class=" bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"   />
    </div>

  </div>
  <div class="md:flex md:items-center mb-6  ">
    <div class="md:w-1/3">
      <label   required type="text" class="block text-black italic font-bold md:text-right mb-1 md:mb-0 pr-6" for="inline-full-name">
        Document :
      </label>
    </div>
    <div class="md:w-5/6">
      <input required type="text"  onChange={e=> handleAddData(e,"doc")} id="document"  value={addDocument.document.text}  name="addDocumentname" class=" bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"  />
    </div>

  </div>
  
  <div class="flex justify-end ...">
               <div class="  rounded-full mr-4 ">
               <button style={{borderRadius:20}} type="submit" class=" bg-blue-500  text-white rounded-lg hover:bg-blue-700 rounded-full... p-3 text-center bg-blue ">
                Add
               </button>
               </div>
               <div class=' bg-white rounded-full'>
               <button style={{borderRadius:20}} onClick={()=>{setOpenModal(false)
                   setaddDocument({  path:"",
                           document:{
                            text:""
                         }})                                              
               }} class=" bg-red-500  text-white rounded-full... p-3 text-center bg-blue  hover:bg-red-700">
                 Cancel
               </button>
               </div>
             
               
              </div>
</form>
  
            
      
            </div>
  
             
              </div>
            </ReactDialogBox>
 
          </>
        )}
        {openModalDelete && (
          <div style={{
            backgroundcolor:"red",
          
          }}>

<ReactDialogBox
               closeBox={()=>{setOpenModalDelete(false)}}
              modalWidth='35%'
              headerBackgroundColor='white'
              headerTextColor='Black'
              headerHeight='70px'
              closeButtonColor='black'
              bodyBackgroundColor='white'
              bodyTextColor='black'
              bodyHeight='200px'
              headerText= <h2 class="px-2 py-7"></h2>
            
            >
              <div>
              <div  className="relative w-full ">
      
                  
            <form onSubmit={submitDeletedDocument} class="w-full max-w-sm">
  <div class="md:flex md:items-center mb-6  pt-4 ">
    <div class="md:w-1/3">
      <label  class="block text-black italic font-bold md:text-right mb-1 md:mb-0 pr-6" for="inline-full-name">
        Path :
      </label>
    </div>
    <div class="md:w-5/6">
      <input id="path" onChange={e=> handleDeleteDocument(e)} value={deleteDocumentpath} type="text" name="search" class=" bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"   />
    </div>

  </div>

  <div class="flex justify-end ...">
               <div class="  rounded-full mr-4 ">
               <button style={{borderRadius:20}} type="submit" class=" bg-blue-500  text-white rounded-lg hover:bg-blue-700 rounded-full... p-3 text-center bg-blue ">
                Delete
               </button>
               </div>
               <div class=' bg-white rounded-full'>
               <button style={{borderRadius:20}} onClick={()=>{setOpenModalDelete(false)
                      setDeleteDocumentPath("")}} class=" bg-red-500  text-white rounded-full... p-3 text-center bg-blue  hover:bg-red-700">
                 Cancel
               </button>
               </div>
             
               
              </div>
</form>
  
            
      
            </div>
  
             
              </div>
            </ReactDialogBox>
        
  
          </div>
        )}

       
    </div>
    <ToastContainer />
    </div>
  );
}

export default App;
