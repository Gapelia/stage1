
<?php

	$config = array(
		'Filepicker' => array('apikey' => 'ABFuSiQFbQRylrWy9nCs7z')
	);

?>

<?php

App::uses('FilepickerInfo', 'Filepicker.Lib');
class FilepickerHelper extends AppHelper {
    var $helpers = array('Html');

	function scriptTag() {
		$apikey = FilepickerInfo::getConfig('apikey');
		$out = array();
		$out[] = $this->Html->script('//api.filepicker.io/v1/filepicker.js');
		$out[] = $this->Html->scriptBlock("filepicker.setKey('$apikey')");
		return implode("\n", $out);
	}

}

?>