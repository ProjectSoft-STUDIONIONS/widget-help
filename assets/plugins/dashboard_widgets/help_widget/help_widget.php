<?php
/**
 * Widget: Помощь
 *
 * Виджет помощи. Создаём неопубликованный документ, указываем его ID в настройках - пользуемся. Очень подходит для описания помощи для менеджеров административной панели.
 *
 * @category    plugin
 * @version     1.0.0
 * @license     http://www.gnu.org/copyleft/gpl.html GNU Public License (GPL)
 * @package     modx
 * @author      ProjectSoft<projectsoft2009@yandex.ru> (https://projectsoft.ru/)
 * @internal    @events OnManagerWelcomeHome
 * @internal    @modx_category Dashboard
 * @internal    @properties &menuindex=Позиция виджета;int;100;0 &id_help=ID документа помощи;int;2;1
 * @internal    @installset base
 * @internal    @disabled 0
 */

if (!defined('MODX_BASE_PATH')) {
    die('What are you doing? Get out of here!');
}
$e = &$modx->Event;
// Опции
$id_help = isset($id_help) ? intval($id_help) : 1;
$menuindex = isset($menuindex) ? (int)$menuindex : 10;
// Переменные
$help_content = "";
$help_title = "";
$help_output = "";

switch($e->name){
	case 'OnManagerWelcomeHome': 
		$tbl_site_content = $modx->getFullTableName('site_content');
		$result = $modx->db->select('pagetitle, content', $tbl_site_content, "id='{$id_help}'");
		if($modx->db->getRecordCount( $result ) == 1):
			$row = $modx->db->getRow($result );
			$help_title = $row["pagetitle"];
			$help_output .=  '<div class="card-body"><div id="help_content"><div id="frame_help"><style>.list-decimal > li {list-style: decimal;} h3, .h3 {color: red;}</style>' . $row["content"] . '</div></div></div>';
			$widgets['help-widget'] = array(
				'menuindex' => $menuindex,
				'id' => 'help-widget',
				'cols' => 'col-sm-12',
				'icon' => 'fa-question-circle',
				'title' => $help_title,
				'body' => $help_output
			);
		endif;
		$modx->event->output(serialize($widgets));
		break;
}