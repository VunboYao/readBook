import $ from 'jquery'
import _ from 'lodash'
import '../css/index.css'

const $div = $('<div></div>')
$div.text(_.join(['1', '2', '3'], '+'))
$('body').append($div)
