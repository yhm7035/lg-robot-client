const workerHeaders = [
  { title: 'Cluster name', width: '330px', type: 'name' },
  { title: 'Owner ID(Address)', width: '500px', type: 'address' },
  { title: 'Platform', width: '160px', type: 'platform' }
]

const kubernetesHeaders = [
  { title: 'Container ID', width: '280px', type: 'containerId' },
  { title: 'Image Name', width: '160px', type: 'imageName' },
  { title: 'Status', width: '180px', type: 'status' },
  { title: 'Endpoint', width: '320px', type: 'endpoint' },
  { title: '', width: '60px', type: 'delete' }
]

const dockerHeaders = [
  { title: 'Container ID', width: '500px', type: 'containerId' },
  { title: 'Image Name', width: '220px', type: 'imageName' },
  { title: 'Status', width: '220px', type: 'status' },
  { title: '', width: '60px', type: 'delete' }
]

module.exports = {
  workerHeaders,
  kubernetesHeaders,
  dockerHeaders
}
