<?php

/**
 * implements hook_features_export_option()
 */
function nr_slider_features_export_options() {
  $options = array();
  foreach(nrFullScreenSlider::get_all() as $slider)
    $options[$slider->machine_name] = $slider->title;

  return $options;
}

/**
 * implements hook_features_export()
 */
function nr_slider_features_export($data, &$export, $module_name) {
  $export["dependencies"]["media"] = "media";
  $export["dependencies"]["nr_slider"] = "nr_slider";

  foreach ($data as $slider) {
    $export["features"]["nr_slider"][$slider] = $slider;
  }
}

/**
 * implements hook_feature_export_render()
 */
function nr_slider_features_export_render($module_name, $data, $export = NULL) {
  $code = array();

  $sliders = db_select("nr_sliders", "mfs")
    ->fields("mfs")
    ->condition("machine_name", array_keys($data), "IN")
    ->execute()
    ->fetchAllAssoc("machine_name");
  $sliders_export = features_var_export($sliders);


  $code[] = "\$sliders = {$sliders_export};";
  $code[] = "foreach (\$sliders as \$slider) {";
  $code[] = "\t\$slider = (object)\$slider;";
  $code[] = "\t\$slider = _nr_slider_recast('nrFullScreenSlider',\$slider);";
  $code[] = "\t\$slider->id = NULL;\n";
  $code[] = "\t\$slider->save();";
  $code[] = "}";
  return array("install" => implode("\n", $code));
}