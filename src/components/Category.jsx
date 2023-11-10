import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { addToCategory, getAllCategory, getvideo, updatecategory } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteCategory } from '../services/allAPI';
import { Card, Row } from 'react-bootstrap';
import VideoCard from './VideoCard';
import { Col} from 'react-bootstrap'

function Category() {
  const [categoryName, setCategoryName] = useState('')
  const [category, setCategory] = useState([])

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleAdd = async () => {
    console.log(categoryName);


    if (categoryName) {

      let body = {
        categoryName,
        Allvideos: []
      }
      const response = await addToCategory(body)
      console.log(response);
      if (response.status >= 200 && response.status < 300) {
        toast.success('category added sucessfull')
        setCategoryName('')
        handleClose()
      }
      else {
        toast.error('somthing went wrong')
      }
    } else {
      toast.warning('please fill the form')
    }
  }

  //function to get all categories
  const allcategory = async () => {
    const { data } = await getAllCategory()
    /* console.log(data); */
    setCategory(data)
    allcategory()
  }
  /*   console.log(category);
   */
  useEffect(() => {
    allcategory()
  }, [])

  //remove a category
  const removeCategory = async (id) => {
    await deleteCategory(id)
    allcategory()
  }

  //function to prevent reload
  const dragOver = (e) => {
    e.preventDefault();
  }
  //function to drop video card
  const VideoDrop = async (e, categoryid) => {
    console.log(`category in which video card is droped ${categoryid}`);
    let videoID = e.dataTransfer.getData("videoID")
    console.log(videoID);
    //api to get a video
    const { data } = await getvideo(videoID)
    console.log(data);

    let selectedcategory = category.find((item) => item?.id === categoryid)
    selectedcategory.Allvideos.push(data)
    console.log(selectedcategory);


    await updatecategory(categoryid, selectedcategory)
    allcategory()

  }





  return (
    <>
      <div>
        <button onClick={handleShow} className='btn btn-warning'>add new category</button></div>



      {category?.length > 0 ?
        category?.map((item) => (
          <div className=' m-5 border border-secondary p-3' droppable onDragOver={(e) => dragOver(e)} onDrop={(e) => VideoDrop(e, item?.id)}>
            <div className='d-flex justify-content-between align-items-center'>
              <h6> {item.categoryName}</h6>
              <Button onClick={() => removeCategory(item?.id)} variant="primary"><i class="fa-solid fa-trash"></i></Button>

            </div>
            <Row>
              <Col>{
                item?.Allvideos.length > 0 ?
                  item.Allvideos.map((Card) => (<VideoCard  display = { Card } isPresent={true}/>))
                :<p>nothing to display</p>
    }</Col>
            </Row>
          </div>))
        : <p className='fw-bolder fs-5 text-danger m-3'>nothig to display</p>
      }



      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>add new category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='border border-secondary p-3 rounded'>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter category name" onChange={(e) => { setCategoryName(e.target.value) }} />
            </Form.Group>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAdd}>add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={2000} />

    </>
  )
}

export default Category