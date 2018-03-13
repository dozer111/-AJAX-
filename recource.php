<?php
/**
 * Файл, который выдает информацию для страниц
 */

$db=new mysqli('localhost','root','','quester');



#1 узнаем текущую страницу
$page=(isset($_POST['page']))?$_POST['page']:1;

$pageLimit=10;
# позиция, с которой начнется выборка значений
$pageOffset=($page-1)*$pageLimit;







if(isset($_POST['filter1']) && $_POST['filter1']!=='false' )
{
    $countQuery="SELECT * FROM quest WHERE quest_email='".$_POST['filter1']."' ";
    if(isset($_POST['filter3']) && $_POST['filter3']!=='false' )
    {
        $countQuery.=' ORDER BY `id` '.$_POST['filter3'];
    }


}
elseif(isset($_POST['filter2']) && $_POST['filter2']!=='false')
{
    $countQuery="SELECT * FROM quest WHERE quest_author='".$_POST['filter2']."' ";
    if(isset($_POST['filter3']) &&  $_POST['filter3']!=='false')
    {
        $countQuery.=' ORDER BY `id` '.$_POST['filter3'];
    }

}
else
{
    $countQuery='SELECT * FROM `quest`';
}














// к-во записей для пагинации
$itemCount=$db->query($countQuery)->num_rows;
// максимальное к-во страниц
$paginationMaxPage=ceil($itemCount/$pageLimit);
// страницы пагинации
$pages=[];


/**
 * Логика пагинации
 */
if($paginationMaxPage<5)
{
    for ($i=$paginationMaxPage;$i>0;$i--)
    {
        $pages['list'][]=$i;
    }
}
else
{

    if($page<=3)
    {
            $pages['list']=[1,2,3,4];
        $pages['list'][]=$paginationMaxPage;
    }
    elseif($page>3 && $page<$paginationMaxPage-2 )
    {   $pages['list'][]=1;
        for ($i=$page-2;$i<=$page;$i++)
        {
            $pages['list'][]=$i;
        }
        $pages['list'][]=$page+1;
        $pages['list'][]=$paginationMaxPage;
    }
    else
        {
        $pages['list'][]=1;
        $pages['list'][]=$paginationMaxPage-3;
        $pages['list'][]=$paginationMaxPage-2;
        $pages['list'][]=$paginationMaxPage-1;
        $pages['list'][]=$paginationMaxPage;
        }

}



#2 берем записи для текущей страницы
$itemsQuery=$countQuery."  LIMIT ".$pageOffset.",".$pageLimit;
#if(isset($_POST['filter1']) || isset($_POST['filter2'])) die(var_dump($itemsQuery));
$items=$db->query($itemsQuery)->fetch_all(MYSQLI_ASSOC);

if(isset($_POST['filter1']) && $_POST['filter1']!=='false')
{
# 3 формируем ответ
    $result=['filter1'=>$_POST['filter1'],'pageList'=>$pages,'currentPage'=>$page,'maxPageSize'=>$paginationMaxPage,'items'=>$items];
}
elseif (isset($_POST['filter2']) && $_POST['filter2']!=='false')
    $result=['pageList'=>$pages,'currentPage'=>$page,'maxPageSize'=>$paginationMaxPage,'items'=>$items];
else
    # 3 формируем ответ
    $result=['pageList'=>$pages,'currentPage'=>$page,'maxPageSize'=>$paginationMaxPage,'items'=>$items];



echo  json_encode($result);
#echo "<pre>";
#print_r($result);





?>




