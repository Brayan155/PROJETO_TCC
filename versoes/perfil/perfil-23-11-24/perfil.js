function editField(fieldId) {
    const field = document.getElementById(fieldId);
    const currentValue = field.innerText;

    // Create an input element with the current value
    const input = document.createElement("input");
    input.type = "text";
    input.value = currentValue;
    input.className = "editable-input";

    // Replace the field's content with the input element
    field.innerText = "";
    field.appendChild(input);

    // Focus on the input element
    input.focus();

    // Save the new value when the user clicks outside or presses Enter
    input.addEventListener("blur", () => saveValue(field, input));
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") saveValue(field, input);
    });
}

function saveValue(field, input) {
    const newValue = input.value.trim();
    field.innerText = newValue || "N/A"; // Fallback to "N/A" if empty
}
