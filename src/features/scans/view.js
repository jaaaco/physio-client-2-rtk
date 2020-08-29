import React from 'react'
import { MeshViewer } from '@dev3dbody/mesh-viewer'

const ScanView = ({ scan }) => {
  if (!scan) {
    return null
  }

  function base64ToArrayBuffer (base64) {
    var binaryString = window.atob(base64)
    var len = binaryString.length
    var bytes = new Uint8Array(len)
    for (var i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    return bytes.buffer
  }

  return (
    <MeshViewer mesh={base64ToArrayBuffer(scan._attachments['scan.ply'].data)} />
  )
}

export default ScanView
