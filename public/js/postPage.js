var pd = document.querySelector('.postDelete')
if (pd) {
  pd.addEventListener('click', deleteIndividualPost)
}

async function deleteIndividualPost(){
    console.log('obj')
}

var loadFile = function(event) {
  var output = document.getElementById('uploadPreview');
  output.src = URL.createObjectURL(event.target.files[0]);
  output.onload = function() {
    URL.revokeObjectURL(output.src) // free memory
  }
};
