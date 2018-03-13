$(function () {


    load_data(1);
    function load_data(page,param1,param2,param3) {

        if(param1===undefined && param2===undefined && param3===undefined)
        {
            $.ajax({
                url: "recource.php",
                type: "POST",
                data: {page: page},
                success: function (data) {
                    var test = JSON.parse(data);
//==================================================================================================================================================================================
//==================================================================================================================================================================================
                    // 1 узнаем ,сколько всего значений пришло в ответе
                    var count = test.pageList.list.length;
                    // pagination ==> HTML код для ссылок на пагинацию
                    var pagination = '';
                    $('.pagination_link_a').attr('id',test.currentPage).text(test.currentPage);
                    for (var i = 0; i < count; i++) {

                        if(test.pageList.list[i]==test.currentPage)
                            pagination += '<button  class="pagination_link active" id="' + test.pageList.list[i] + '">' + test.pageList.list[i] + '</button>'
                        else
                            pagination += '<button  class="pagination_link" id="' + test.pageList.list[i] + '">' + test.pageList.list[i] + '</button>';

                    }
                    // сама пагинация
                    $('.pagination').html(pagination);






                    // вытягиваю данные в массиве заданий
                    var itemCount = test.items.length;
                    var itemString = " <tr >" +
                        "        <th>ID</th>" +
                        "        <th>Title</th>" +
                        "        <th>Text</th>" +
                        "        <th>Author</th>" +
                        "        <th>Email</th>" +
                        "    </tr>";
                    for (var i = 0; i < itemCount; i++) {
                        itemString += "<tr>";
                        itemString += "<td class='item_id'>" + test.items[i].id + "</td>";
                        itemString += "<td class='item_title'>" + test.items[i].quest_title + "</td>";
                        itemString += "<td class='item_text'>" + test.items[i].quest_text + "</td>";
                        itemString += "<td class='item_author'>" + test.items[i].quest_author + "</td>";
                        itemString += "<td class='item_email'>" + test.items[i].quest_email + "</td>";
                        itemString += "</tr>";
                    }
                    $('table').html(itemString);
                    var item = test.items[0].quest_email;
                    // достучался к pageList[] -> list[] ->1,2,3,4,5
                    // alert(test.pageList.list[1]);
                    //$('.test').text(data);

                }
            });
        }
        else
        {
            var filter1=param1;
           var filter2=param2;
           var filter3=param3;

            $.ajax({
                url: "recource.php",
                type: "POST",
                data: {page:page,filter1:filter1,filter2:filter2,filter3:filter3},
                success: function (data) {
                    var test = JSON.parse(data);
//==================================================================================================================================================================================
//==================================================================================================================================================================================
                    // 1 узнаем ,сколько всего значений пришло в ответе
                    var count = test.pageList.list.length;
                    // pagination ==> HTML код для ссылок на пагинацию
                    var pagination = '';
                    $('.pagination_link_a').attr('id',test.currentPage).text(test.currentPage);
                    for (var i = 0; i < count; i++) {

                        if(test.pageList.list[i]==test.currentPage)
                            pagination += '<button  class="pagination_link active" id="' + test.pageList.list[i] + '">' + test.pageList.list[i] + '</button>'
                        else
                            pagination += '<button  class="pagination_link" id="' + test.pageList.list[i] + '">' + test.pageList.list[i] + '</button>';

                    }
                    // сама пагинация
                    $('.pagination').html(pagination);






                    // вытягиваю данные в массиве заданий
                    var itemCount = test.items.length;
                    var itemString = " <tr >" +
                        "        <th>ID</th>" +
                        "        <th>Title</th>" +
                        "        <th>Text</th>" +
                        "        <th>Author</th>" +
                        "        <th>Email</th>" +
                        "    </tr>";
                    for (var i = 0; i < itemCount; i++) {
                        itemString += "<tr>";
                        itemString += "<td class='item_id'>" + test.items[i].id + "</td>";
                        itemString += "<td class='item_title'>" + test.items[i].quest_title + "</td>";
                        itemString += "<td class='item_text'>" + test.items[i].quest_text + "</td>";
                        itemString += "<td class='item_author'>" + test.items[i].quest_author + "</td>";
                        itemString += "<td class='item_email'>" + test.items[i].quest_email + "</td>";
                        itemString += "</tr>";
                    }
                    $('table').html(itemString);
                    var item = test.items[0].quest_email;
                    // достучался к pageList[] -> list[] ->1,2,3,4,5
                    // alert(test.pageList.list[1]);
                    $('.test').text(data);

                }
            });
        }




            }

    /**
     * Просто отображинеие данных с пагинацией без фильтров
     */
    $(document).on ("click", "button", function () {
        var page=$(this).attr("id");
        load_data(page);
    });



  $(document).on('click','.item_email',function () {
       var email=$(this).text();
       var page=$('.pagination_link_a').attr("id");

        load_data(page,email,false,false);
    });
   $(document).on('click','.item_author',function () {
      var authorId=$(this).text();
      var page=$('.pagination_link_a').attr('id');
      load_data(page,false,authorId,false);
   });



});
