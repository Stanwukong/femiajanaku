import React from 'react'

type Props = {}

const Resume = (props: Props) => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
    <iframe
      src="/Femi_Ajanaku_CV.pdf"
      width="100%"
      height="100%"
      style={{ border: "none" }}
      title="PDF Viewer"
    />
  </div>
  )
}

export default Resume