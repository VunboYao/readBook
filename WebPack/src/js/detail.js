import $ from 'jquery'
import _ from 'lodash'
import '../css/custom.css'

const $div = $('<h2></h2>')
$div.text(_.join(['1', '2', '3'], '+'))
$('body').append($div)
