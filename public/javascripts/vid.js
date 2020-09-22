$(document).on("change", ".multi-video", function(e) {

	e.preventDefault();

  var parent = $(this).closest('.modal-content');
  var videoPrDiv = parent.find('.video-pr-div');
  videoPrDiv.html(`<video class="py-0 my-0 video-pr-video" loop controls>
  <source src="" id="video_here">
    Your browser does not support HTML5 video.
</video>`);
  videoPrDiv.css('width', 'auto').css('height', 'auto');
  // debugger;

  var $source = parent.find('#video_here');
  $source[0].src = URL.createObjectURL(this.files[0]);
  $source.parent()[0].load();
});

$('.cancel-vid').on('click', function(e){
  e.preventDefault();

  var parent = $(this).closest('.modal-content');
  var videoPrDiv = parent.find('.video-pr-div');
  videoPrDiv.html('');

  if(screen && screen.width > 500){
    videoPrDiv.css('width', '400px').css('height', '200px');    
  }else if(screen && (screen.width>380 && screen.width<500)){
    videoPrDiv.css('width', '300px').css('height', '150px');  
  }else{
    videoPrDiv.css('width', '230px').css('height', '110px');  
  }

})