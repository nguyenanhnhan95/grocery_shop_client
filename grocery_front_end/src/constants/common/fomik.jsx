export function convertFileToImg(files){
    let images =[];
    let size=files.length;
    for(let i=0;i<size;++i){
        console.log(files[i].type)
        images.push({
            "extension":files[i].type,
            "imageUrl":URL.createObjectURL(files[i]),
            "name":files[i].name
        })
    }
    return images;
}