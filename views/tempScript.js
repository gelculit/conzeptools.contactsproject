
<!-- Add image  -->
<div class="picImage">

    <div class="upload">
        <img src="emptyImage.png" alt="" id="image">
                
        
                
        <div class="leftRound" id="cancel" style="display: none;">
            <i class="fa fa-times"></i>
        </div>
        
        <div class="rightRound" id="upload">
            <input type="file" name="fileImg" id="fileImg">
            <i class="fa fa-camera"></i>
        </div>
                
        <!--div class="rightRound" id="confirm" style="display: none;">
            <input type="submit" name="" value="">
            <i class="fa fa-check"></i>
        </div-->
    </div>

    
</div>
<!-- Add image  -->







    <script>
			let btnClear = document.querySelector('.btnClr');
			let inputs = document.querySelectorAll('input');
			
			btnClear.addEventListener('click', (e) => {
				e.preventDefault();
				inputs.forEach(input => input.value = '');
			});
		
		</script>
		
		
		<script type="text/javascript"> <!-- Select which picture to upload  -->
			document.getElementById("fileImg").onchange = function(){
				document.getElementById("image").src = URL.createObjectURL(fileImg.files[0]); // Preview new image
				
				document.getElementById("cancel").style.display = "block";
				//document.getElementById("confirm").style.display = "block";
				
				document.getElementById("upload").style.display = "none";
			}
			
			var userImage = document.getElementById("image").src;
			document.getElementById("cancel").onclick = function(){
				document.getElementById('image').src = userImage; //Back to previous image
				
				document.getElementById("cancel").style.display = "none";
				//document.getElementById("confirm").style.display = "none";
				
				document.getElementById("upload").style.display = "block";
			}
		
	</script>