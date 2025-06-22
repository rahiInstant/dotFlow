const form = document.getElementById('myForm');
const submitBtn = document.getElementById('btnSave');


// Example object, assign to a variable if needed:
const exampleFields = {
    "field_xmynu3": "value1",
    "field_4g2j3k": "value2",
    "field_123456": "value3",
};

// Listen for the form's submit event
form.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent default form submission

  // Collect form data
  const formData = new FormData(form);
  const details = Object.fromEntries(formData.entries());

  const customEvent = new CustomEvent('myFormSubmitEvent', {
    detail: { data: details }, 
    bubbles: true 
  });

  submitBtn.dispatchEvent(customEvent);
});



 submitBtn.addEventListener('formSubmitEvent', function(e) {
  for(let value in e.detail) {
    console.log(value)
  }
});

