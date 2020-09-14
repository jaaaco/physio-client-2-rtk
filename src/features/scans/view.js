import React from 'react'
import { MeshViewer } from '@dev3dbody/mesh-viewer'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'

const ScanView = ({ loading, scan }) => {
  if (loading || !scan) {
    return (
      <Segment style={{ height: '730px' }}>
        <Dimmer active>
          <Loader />
        </Dimmer>
      </Segment>
    )
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
    <Segment>
      <MeshViewer mesh={base64ToArrayBuffer(scan._attachments['scan.ply'].data)} />
    </Segment>
  )
}

export default ScanView
