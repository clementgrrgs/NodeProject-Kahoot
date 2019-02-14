var update = document.getElementById('update');

update.addEventListener('click', () => {
    fetch('quiz', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'name': 'Darth Vader',
          'quiz': 'I find your lack of faith disturbing.'
        })
    }).then(res => {
        if (res.ok) return res.json();
    }).then (data => {
         console.log(data);
         //window.location.reload(true);
    });
});


var del = document.getElementById('delete')

del.addEventListener('click', function () {
  fetch('quiz', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': 'Darth Vader'
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  }).
  then(data => {
    console.log(data)
    window.location.reload()
  })
})