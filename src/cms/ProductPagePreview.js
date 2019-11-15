import React from "react"
import PropTypes from "prop-types"

const ProductPagePreview = ({ entry, widgetFor }) => {
  return <div></div>
}

ProductPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default ProductPagePreview
