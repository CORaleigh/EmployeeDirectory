/**
 * onload functions
 */
$(document).ready(function(){
	
	/**
	 * Location toggle
	 */
	//TODO Add map functionality for valid addresses
	$('.toggle').click(function(){
    	$(this).closest('div').next().toggleClass('hidden');
    });
	
	/**
	 * Responsible for laoding all images after page has already loaded.
	 * It might be a good idea to only load images within the viewport as a next step
	 */
	//TODO Only load images within the viewport
	$('.person img').each(function() {
		 this.src = $(this).data('src');
		 $(this).removeData('src');
	});	
	
	/**
	 * Form validation and google tracking for "search"
	 */
	$('#searchForm').submit(function(event){
		if($('#Department').val() == "All Departments"){
			  if($('#Name').val() == ""){
				  $('#ErrorMessage').html("Please provide a name or department.");
				  event.preventDefault();
				  return;
			  }else if($.trim($('#Name').val()) != '' && $.trim($('#Name').val()).length < 2){
				  $('#ErrorMessage').html("Name must be at least 2 characters.");
				  event.preventDefault();
				  return;
			  }
		  }
		event.preventDefault();
		_gaq.push(['_trackEvent','search', $('#Department').val(), $('#Name').val(), , true]);
		var form = this;
		setTimeout(function(){ form.submit()}, 100);
	});
	
	/**
	 * Show more results and track with analytics "showall"
	 */
	$("#ShowAll").click(function(){
		try { 
			_gaq.push(['_trackEvent', 'showall' , '', '', , true]); 
		} catch(err){
			console.log("analytics failed to track event");
		}
		 
		setTimeout(function() {
			//Do nothing, just tiemout
		}, 100);
		$('[name="showall"]').val('true');
		$('#Search').click();
	});
	
	//Track location clicks
    $('.icon-location a').click(function(){
		trackOutboundLink(this,'location','expand','');
		return false;
	});
    
    //Track telephone number clicks
    $('a[href^="tel"]').click(function(){
    	trackOutboundLink(this,'phone',this.href.replace(/^tel:/i, ''),'');
		return false;
	});
    
    //Track email clicks
    $('a[href^="mailto"]').click(function(){
    	trackOutboundLink(this,'email',this.href.replace(/^mailto:/i, ''),'');
		return false;
	});
});

/**
 * Handle profile image 404s by replacing with the user icon
 * 
 * @param image
 * @returns {Boolean}
 */
//TODO Handle 404s differently because it is very noisy and there are too many requests.
function imgError(image) {
	$(image).after($('<span class="icon-user"></span>'));
	$(image).remove();
    return true;
}

/**
 * Shortcut code to track link clicks before the user leaves the page
 * 
 * @param link
 * @param category
 * @param action
 * @param label
 */
function trackOutboundLink(link, category, action, label) { 
	try { 
		_gaq.push(['_trackEvent', category , action, label, , true]); 
	} catch(err){
		console.log("analytics failed to track event");
	}
	 
	setTimeout(function() {
		document.location.href = link.href;
	}, 100);
}