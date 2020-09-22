$("#create-topic").submit(function(e){
    e.preventDefault();
    var actionUrl = $(this).attr('action');
    var parent = $(this).closest('.parent-container');
    var coverImgSrc = parent.find('#pr-cover-img').attr('src');


    var fd = new FormData();
	var file_data = $('input[type="file"]')[0].files; //for multiple files

	// for(var i = 0;i<file_data.length;i++){
	//     fd.append("file_"+i, file_data[i]);
	// }

	    fd.append("topicImage", file_data[0]);//only one image for now
	    //name="topicImage" in the required input[type="file"] field 
	    //that same name is used in the route while uploading 

    var other_data = $(this).serializeArray();


	$.each(other_data,function(key,input){
		if(input.name === 'topic[coverImage]'){
			input.value = coverImgSrc;

			fd.append(input.name,input.value);
		}else if(input.name === 'topic[category]'){
			var optVal = $('select#category').children("option:selected").text();

			input.value = optVal;
			fd.append(input.name,input.value);
		}
		else if(input.name === 'tags'){

			debugger;
			// if(input.value.length > 1){
				var tags = [];

				$.each($("#tags option:selected"), function(){            
	            	tags.push($(this).text());
	        	});

	        	input.value = tags;
			// }
			debugger;
			fd.append(input.name,input.value);
			
		}
		else{
	    	fd.append(input.name,input.value);			
		}

	});

	$.ajax({
	    url: actionUrl,
	    data: fd,
	    contentType: false,
	    processData: false,
	    type: 'POST',
	    success: function(res){
	    	if(res.redirect){
	    		window.location = res.redirect;
	    	}
	    },
	    error: function(err){
	    	console.log(err);
	    }
	});
		
});
