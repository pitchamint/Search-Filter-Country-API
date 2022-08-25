const result = document.getElementById("result")
const filter = document.getElementById("filter")
const listItem = [] //เป็นตัวแปรที่เอาไว้เก็บข้อมูลแล้วค่อยเอามากรองทีหลัง

//ระบบค้นหาข้อมูล
//ทำการกรองว่ามีการพิมลงไปที่ input ยัง
filter.addEventListener("input",(e)=>{
    const search = e.target.value.toLowerCase() //เนื่องจากเวลาเราพิมพ์ค้นหา บางทีพิมพ์ตัวพิมพ์เล็ก/ใหญ่ไม่เหมือนกัน ก็เลยจะการค้นหาของผู้ใช้แปลงให้เป็นตัวพิมพ์เล็กหมด
    listItem.forEach(item=>{
        if(item.innerText.toLowerCase().includes(search)){ //หมายถึงข้อความชื่อประเทศตัวพิมพ์เล็ก เปรียบเทียบตรงกับที่ผู้ใช้พิมพ์มามั้ย(.includes(search))
            //แสดงรายการ
            item.classList.remove("hide")
        }else{
            //ซ่อนรายการที่ไม่เกี่ยวข้อง
            item.classList.add("hide")
        }
        //class hide เรามีการกำหนดสไตล์ไว้แล้วใน css 
    })
})

//ดึงข้อมูลจาก API 
async function getData(){
    const url ="https://restcountries.com/v2/all"
    const response = await fetch(url) //fetch แปลว่าดึงข้อมูลมาจาก url /response คือการตอบกลับข้อมูล
    const items = await response.json()
    //แสดงผลข้อมูลหน้าเว็บ
    result.innerHTML = "" //กำหนดให้เป็นค่าว่างในตอนแรก
    items.forEach(data => {
        const li = document.createElement("li") //สร้าง Li ตามจำนวนสมาชิกที่อนู่ในอาเรย์
        listItem.push(li) //เก็บ li ที่ได้ไว่ใน list item ที่เป็น array
        li.innerHTML = `
            <img src="${data.flag}">
            <div class="info">
                <h4>${data.name}</h4>
                <p>${formatNumber(data.population)}</p>
            </div>
        `
        //เก็บ li ใน reslut
        result.appendChild(li)
    })
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
getData()