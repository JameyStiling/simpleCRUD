var update = document.getElementById('update')

update.addEventListener('click', function() {
  fetch('comment', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': 'Deanna deBara',
        'comment': 'Is sirry.'
      })
    }).then(res => {
      if (res.ok) return res.json()
    })
    .then(data => {
      console.log(data)
        //reload to see changes.  this isn't a cool React application quite yet...
      window.location.reload(true)
    })
})
