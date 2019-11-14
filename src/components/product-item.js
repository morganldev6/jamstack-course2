import React, { useEffect, useState } from "react"
import styles from "./product-item.module.scss"
import { Col, Row } from "react-bootstrap"
import BasketIcon from "./basket-icon"
import { ADD_TO_CART, useStateValue } from "../state/state"

const ProductItem = ({ productItem }) => {
  const [selectedItem, setSelected] = useState()

  useEffect(() => {
    setSelected({
      ...productItem,
      items: productItem.items.reduce((prev, curr) => (prev.price < curr.price ? prev : curr)),
    })
  }, [productItem])

  const [{ cart }, dispatch] = useStateValue()
  return (
    <>
      {selectedItem && (
        <div className={styles.mainContainer}>
          <div className={styles.previewContainer}>
            <div className={styles.selectedPreviewContainer}>
              <img
                className={styles.selectedPreviewImage}
                src={`../${selectedItem.items.image}`}
                alt={productItem.name}
              />
              <span>Available sizes:</span>
              <div className="d-flex flex-row align-items-center justify-content-between">
                {selectedItem.items.size.map((size, index) => (
                  <div key={index} className="mx-2 font-weight-bold">
                    {size}
                  </div>
                ))}
              </div>
            </div>
            <Row className={styles.optionsContainer}>
              {productItem.items
                .filter(item => item.id !== selectedItem.items.id)
                .map(item => (
                  <Col
                    className={styles.pointer}
                    xs={12}
                    lg={4}
                    key={item.id}
                    onClick={() => setSelected({ ...selectedItem, items: item })}
                  >
                    <img src={`../${item.image}`} alt={productItem.name} />
                  </Col>
                ))}
            </Row>
          </div>
          <div className={styles.detailsContainer}>
            <h3>{selectedItem.name}</h3>
            <div className={styles.description}>{selectedItem.description}</div>
            <div className={styles.infoContainer}>
              <div className={styles.price}>Price: ${selectedItem.items.price}</div>
              <div className={styles.price}>In stock: {selectedItem.items.qty}</div>
            </div>
            <button
              className="mt-3 btn btn-dark"
              onClick={() => dispatch({ type: ADD_TO_CART, payload: selectedItem })}
            >
              <BasketIcon size={1.5} color={"#fff"} />
              <span className={`mx-2 ${styles.buttonText}`}>Add to Cart</span>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductItem
