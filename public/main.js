

function deleteProduct(id){
    const result =confirm("Are you sure you want to delete product");
    if (result){
        console.log("hi");
        fetch("/delete/"+id , {
            method:"POST",
        }).then(res=>{
            if(res.ok){
                location.reload();
            }
        });
    }
}