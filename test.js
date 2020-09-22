    $("#post-create-images").change(function () {
      if($(this)[0].files.length <= 4){

        if (typeof (FileReader) != "undefined") {
            var dvPreview = $("#create-post-preview-image");
            dvPreview.html("");
            var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;


              //For single image only
              $($(this)[0].files).each(function () {
                  var file = $(this);
                  if (regex.test(file[0].name.toLowerCase())) {
                      var reader = new FileReader();
                      reader.onload = function (e) {
                          var singleImg = $(`<div class="each-img-container single-pr-image"></div>`)
                          var img = $("<img />");
                          var label = $(`<button type="button" class="btn btn-cancel-img-pr"><i class="fas fa-2x fa-times-circle fa-cancel-pr"></i></button>`);
                          img.attr("class", "cr-post-pr-images p-0 pr-img1");
                          img.attr("src", e.target.result);
                          singleImg.append(img);
                          singleImg.append(label);

                          dvPreview.append(singleImg);
                      }
                      reader.readAsDataURL(file[0]);
                  } else {
                      alert(file[0].name + " is not a valid image file.");
                      dvPreview.html("");
                      return false;
                  }
              }); 


        }
      }

  });