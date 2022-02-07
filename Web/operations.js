let baseAddress = 'http://127.0.0.1:3000/';
let blobBaseAddress = 'https://adbassignment.blob.core.windows.net/adbimages/';

// Search by Name
function searchByName() {
    let name = document.getElementById("name");
    if (name) {
        fetch(`${baseAddress}searchByName?name=${name.value}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                let ele = document.getElementById("searchContent");
                ele.innerHTML = generateHtml(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}

// Search by Salary
function searchBySalary() {
    let salary = document.getElementById("salary");
    if (salary) {
        fetch(`${baseAddress}searchBySalary?salary=${salary.value}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                let ele = document.getElementById("searchContent");
                let htmlStr = '<div>';
                data.forEach(element => {
                    htmlStr += generateHtml(element);
                });
                htmlStr += '</div>';
                ele.innerHTML = htmlStr;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}

// Remove Employee
function removeEmployee() {
    let employeeToRemove = document.getElementById("employeeToRemove");
    if (employeeToRemove) {
        fetch(`${baseAddress}removeEmployee?name=${employeeToRemove.value}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                let ele = document.getElementById("searchContent");
                ele.innerHTML = "Employee Removed Successfully.";
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}

// Salary to Update
function UpdateSalary() {
    let employeeToUpdateSalary = document.getElementById("employeeToUpdateSalary");
    let updatedSalary = document.getElementById("updatedSalary");
    if (employeeToUpdateSalary && updatedSalary) {
        fetch(`${baseAddress}updateSalary`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: employeeToUpdateSalary.value, salary: updatedSalary.value}),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                let ele = document.getElementById("searchContent");
                ele.innerHTML = "Employee Salary Updated Successfully.";
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}

// Update Employees Keyword
function UpdateKeyword() {
    let employeeToUpdateKeyword = document.getElementById("employeeToUpdateKeyword");
    let updatedKeyword = document.getElementById("updatedKeyword");
    if (employeeToUpdateKeyword && updatedKeyword) {
        fetch(`${baseAddress}updateKeyWord`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: employeeToUpdateKeyword.value, keyWord: updatedKeyword.value}),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                let ele = document.getElementById("searchContent");
                ele.innerHTML = "Employee Keyword Updated Successfully.";
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}

function generateHtml(data) {
    let imageAddress = blobBaseAddress + data.Picture;
    let htmlStr = `<div>
        Name: ${data.Name}
        <img src=${imageAddress} />
    </div`;
    return htmlStr;
}