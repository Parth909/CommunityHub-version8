$('.create_topic_name').keyup(function () {

        var parent = $(this).closest(".create-topic-container");
        var characterCount = $(this).val().length,
        current = parent.find('.current_topic_characters'),
        maximum = parent.find('.maximum_topic_characters'),
        theCount = parent.find('.the_count_topic_characters');
        var maxlength = $(this).attr('maxlength');
        var changeColor = 0.75 * maxlength;
        current.text(characterCount);

        if (characterCount > changeColor && characterCount < maxlength) {
          current.css('color', '#00b7ff');
          current.css('fontWeight', 'bold');
        }
        else if (characterCount >= maxlength) {
          current.css('color', '#e74a3b');
          current.css('fontWeight', 'bold');
        }
        else {
          var col = maximum.css('color');
          var fontW = maximum.css('fontWeight');
          current.css('color', col);
          current.css('fontWeight', fontW);
        }
      });

$('.create_topic_name2').keyup(function () {

        var parent = $(this).closest(".create-topic-container");
        var characterCount = $(this).val().length,
        current = parent.find('.current_topic_characters'),
        maximum = parent.find('.maximum_topic_characters'),
        theCount = parent.find('.the_count_topic_characters');
        var maxlength = $(this).attr('maxlength');
        var changeColor = 0.75 * maxlength;
        current.text(characterCount);

        if (characterCount > changeColor && characterCount < maxlength) {
          current.css('color', '#00b7ff');
          current.css('fontWeight', 'bold');
        }
        else if (characterCount >= maxlength) {
          current.css('color', '#e74a3b');
          current.css('fontWeight', 'bold');
        }
        else {
          var col = maximum.css('color');
          var fontW = maximum.css('fontWeight');
          current.css('color', col);
          current.css('fontWeight', fontW);
        }
      });
    //SELECT2 CONTAINER

    $(document).ready(function(){
    
     load_json_data('category');

      // debugger;
    
     function load_json_data(id, parent_id)
     {
      var html_code = '';
      $.getJSON('/category_tags.json', function(data){


      if(id!='tags'){
        html_code += '<option value="">Select '+id+'</option>';
      } 
      
       $.each(data, function(key, value){//each object
        if(id == 'category')
        {
         if(value.parent_id == '0')
         {
          html_code += '<option value="'+value.id+'">'+value.name+'</option>';
         }
        }
        else
        {
         if(value.parent_id == parent_id)
         {
          
          html_code += '<option value="'+value.id+'">'+value.name+'</option>';
         }
        }
       });
       $('#'+id).html(html_code);
      });
    
     }
    
     $(document).on('change', '#category', function(){
      var category_id = $(this).val();
      if(category_id != '')
      {
       load_json_data('tags', category_id);
      }
      else
      {
       $('#tags').html('');
      }
     });
    
    });

//used to select multiple options from second list
$(document).ready(function() {
    $('#tags').select2({
      closeOnSelect: false
    });
    $('#category').select2();
});

//------------- Preview the image functionality ----------------

function readURL(input) {
  if (input.files && input.files[0]) {

    var reader = new FileReader();

    reader.onload = function(e) {

      $('.image-upload-wrap').hide();

      $('.file-upload-image').attr('src', e.target.result);
      $('.file-upload-content').show();

      $('.image-title').html(input.files[0].name);
    };

    reader.readAsDataURL(input.files[0]);

  } else {
    removeUpload();
  }
}

function removeUpload() {
  //removing the TOPIC LOGO
  $("#pr-topic-img").attr("src","/images/pract_logo2.png");

  $('.file-upload-input').replaceWith($('.file-upload-input').clone());
  $('.file-upload-content').hide();
  $('.image-upload-wrap').show();
}
$('.image-upload-wrap').bind('dragover', function () {
        $('.image-upload-wrap').addClass('image-dropping');
    });
    $('.image-upload-wrap').bind('dragleave', function () {
        $('.image-upload-wrap').removeClass('image-dropping');
});

var loadBackImg = function(event){
  var backImg = document.getElementById("pr-topic-img");
  backImg.src = URL.createObjectURL(event.target.files[0]);
  backImg.onload = function(){
     URL.revokeObjectURL(backImg.src); // free memory
  }
}

// Change the background Image according to the selection

$('.cover-image').on('click', function() {

  var background = $(this).css('background-image');
  background = background.replace('url(','').replace(')','').replace(/\"/gi, "");

 $("#pr-cover-img").attr('src', background);

});
