let list = document.querySelector(".list-group");


document.addEventListener("DOMContentLoaded", async () => {
    let responce = await fetch("https://northwind.vercel.app/api/categories")
    let data = await responce.json()

    data.forEach(item => {
        list.innerHTML += ` <li class="list-item">${item.name}<div class="buttons"><button data-id="${item.id}" class="editBtn">Edit</button><button class="deleteBtn">Delete</button></div></li>`
    });
    let buttons = document.querySelectorAll(".deleteBtn");
    buttons.forEach((btn) => {
        btn.onclick = function (e) {
            let id = e.target.getAttribute("data-id");
            if (Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
            })) {
                fetch(`https://northwind.vercel.app/api/categories/${id}`, {
                    method: "DELETE",
                });
                e.target.parentElement.parentElement.remove();
            }
        };
    });
})

document.getElementById('open-modal').addEventListener('click', function () {
    Swal.fire({
        title: 'Add product',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Add',
        showLoaderOnConfirm: true,
        preConfirm: (add) => {
            return fetch(` https://northwind.vercel.app/api/categories`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText)
                    }
                    return response.json()
                })
                .catch(error => {
                    Swal.showValidationMessage(
                        `Request failed: ${error}`
                    )
                })
        }
    })
    // let editButtons = document.querySelectorAll(".edit");
    // editButtons.forEach((editBtn)=>{
    //   editBtn.addEventListener("click",(e)=>{
    //       let selectedID = e.target.getAttribute("data-id");
    //       editForm.setAttribute("data-id",selectedID);
    //       console.log(selectedID);
    //       editForm.style.display = "block";
    //       let editingName = e.target.previousElementSibling.previousElementSibling.textContent;
    //       let editingDesc = e.target.parentElement.getAttribute("data-desc");
    //       let descInp = document.querySelector("#desc-edit");
    //       let nameInp = document.querySelector("#name-edit");
    //       descInp.value = editingDesc;
    //       nameInp.value = editingName;
    //   })
    // })
})

// const section = document.querySelector("section"),
// const overlay = document.querySelector(".overlay"),
// const showBtn = document.querySelector(".open-modal"),
// const AddBtn = document.querySelector(".add-btn");