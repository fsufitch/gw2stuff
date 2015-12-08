/**
 * jQuery GuildWars2 tooltip
 *
 * Original source:
 * Copyright (C) 2013 Julian Haslinger
 *
 * @author Julian Haslinger
 * @link https://github.com/GamePlayern/jquery-GuildWars2-tooltip
 * @name guildwars2-tooltip.jquery.js
 * @version 0.1.0beta
 * @license http://opensource.org/licenses/bsd-license.php
 *
 * Forked for gw2-stuff on 2015-12-7
 */

(function($){
    $.gw2tooltip = function(selector, settings){
        // settings
        var config = {
            language:'en',                      //active language
            dataTag:'data-gw2item',             //tag for the id
            fadeInTime:0,
            fadeOutTime:0,
            marginPosition: 10,
            localStorage: true,
            //mode:'item',                        //@todo not implemented yet (recipe)
            translate: {
                en: {
                    errormessage500: 'Item ID::%s not Found',
                    requiredlevel: 'Required Level: %s',
                    defense:'Defense:',
                    weaponstrength:'Weapon Strength:',
                    demageseparator:' - ',

                    //attributes
                    vitality:'Vitality',
                    power:'Power',
                    toughness:'Toughness',
                    precision:'Precision',
                    critdamage:'Crit Damage',
                    conditiondamage:'Condition Damage',
                    healing:'Healing',

                    //weightClass
                    heavy:'Heavy',
                    medium:'Medium',
                    light:'Light',

                    //armorTypes
                    boots:'Boots',
                    coat:'Coat',
                    gloves:'Gloves',
                    helm:'Helm',
                    helmaquatic:'Helm Aquatic',
                    leggings:'Leggings',
                    shoulders:'Shoulders',

                    //weaponTypes
                    axe:'Axe',
                    dagger:'Dagger',
                    gocus:'Focus',
                    greatsword:'Greatsword',
                    hammer:'Hammer',
                    harpoon:'Harpoon',
                    longbow:'LongBow',
                    mace:'Mace',
                    pistol:'Pistol',
                    rifle:'Rifle',
                    scepter:'Scepter',
                    shield:'Shield',
                    shortBow:'Short Bow',
                    speargun:'Speargun',
                    staff:'Staff',
                    sword:'Sword',
                    torch:'Torch',
                    trident:'Trident',
                    warhorn:'Warhorn'
                },
                de: {
                    errormessage500: 'Item ID::%s konnte nicht gefunden werden',
                    requiredlevel: 'Erforderliche Stufe: %s',
                    defense:'Verteidigung:',
                    weaponstrength:'Waffenstärke:',
                    demageseparator:' - ',

                    //attributes
                    vitality:'Vitalität',
                    power:'Macht',
                    toughness:'Zähigkeit',
                    precision:'Präzision',
                    critdamage:'Kritischer Schaden',
                    conditiondamage:'Zustandsschaden',
                    healing:'Heilung',

                    //weightClass
                    heavy:'Schwer',
                    medium:'Mittel',
                    light:'Leicht',

                    //armorTypes
                    boots:'Fußrüstung',
                    coat:'Brustrüstung',
                    gloves:'Handrüstung',
                    helm:'Helm',
                    helmaquatic:'Unterwasser Helm',
                    leggings:'Beinrüstung',
                    shoulders:'Schulterrüstung',

                    //weaponTypes
                    axe:'Axt',
                    dagger:'Dolch',
                    focus:'Focus',
                    greatsword:'Großschwert',
                    hammer:'Hammer',
                    harpoon:'Harpune',
                    longbow:'Langbogen',
                    mace:'Streitkolben',
                    pistol:'Pistole',
                    rifle:'Gewehr',
                    scepter:'Zepter',
                    shield:'Schild',
                    shortBow:'Kurzbogen',
                    speargun:'Harpune',
                    staff:'Stab',
                    sword:'Schwert',
                    torch:'Fackel',
                    trident:'Dreizack',
                    warhorn:'Kriegshorn'
                }
            }
        };
        if(settings){
            $.extend(true, config, settings);
        }

        // variables
        var $selector = $(selector);
        var guildwars2tooltipId = '#guildwars2tooltip';
        var defaultLanguage = 'en';
        var localStorageName = 'gw2ItemTooltip';
        var undefined = 'undefined';
        var positionEvent;

        var isStorageActiv = function() {
            try {
                return "localStorage" in window && window['localStorage'] !== null;
            } catch (e) {
                return false;
            }
        };

        var $bodyWrapper = $(document.createElement('div')).addClass('bodyWrapper');
        var $gw2tooltip = $(document.createElement('div')).attr('id','guildwars2tooltip').append($bodyWrapper);

        var positionItem = function() {
            if(typeof positionEvent == undefined) {
                return false;
            }
            var height = $gw2tooltip.height();
            var width = $gw2tooltip.width();
            var top = positionEvent.pageY;
            var left = positionEvent.pageX;

            if(positionEvent.pageY > window.outerHeight/2) {
                $gw2tooltip.removeClass('top').addClass('bottom');
                top = parseInt(top)-parseInt(config.marginPosition)-parseInt(height);
            } else {
                $gw2tooltip.removeClass('bottom').addClass('top');
                top = parseInt(top)+parseInt(config.marginPosition);
            }
            if(positionEvent.pageX > window.outerWidth/2) {
                $gw2tooltip.removeClass('left').addClass('right');
                left = parseInt(left)-parseInt(width)-parseInt(config.marginPosition)-parseInt(config.marginPosition); // <-@todo bug?
            } else {
                $gw2tooltip.removeClass('right').addClass('left');
                left = parseInt(left)+parseInt(config.marginPosition);
            }
            $gw2tooltip.removeAttr('style').css({top:top,left: left});
        };

        /**
         * generate the Text in the box
         * @param data
         */
        var injectStyle = function(data) {
            var getType = function() {
                var attributesList = function(dataType) {
                    var $list;
                    if(data[dataType].infix_upgrade.attributes.length) {
                        $list = $(document.createElement('ul')).addClass('attributeList');
                        $.each(data[dataType].infix_upgrade.attributes, function(i, attr) {
                            $list.prepend(
                                $(document.createElement('li')).text('+'+attr.modifier+' '+translate(attr.attribute.toLowerCase()))
                            );
                        });
                    }
                    return $list;
                };
                // @todo infusion_slots

                console.log(data);
                
                switch (data.type.toLowerCase()) {
                    case('weapon'):
                        return $(document.createElement('div')).addClass('weapon').append([
                            $(document.createElement('div')).addClass('weaponStrength').text(translate('weaponstrength')+' '+data.details.min_power+translate('demageseparator')+data.details.max_power),
                            attributesList('details'),
                            $(document.createElement('div')).addClass('weaponType').text(data.details.type)
                        ]);
                    case('armor'):
                        return $(document.createElement('div')).addClass('armor').append([
                            $(document.createElement('div')).addClass('defense').text(translate('defense')+' '+data.details.defense),
                            attributesList('details'),
                            $(document.createElement('div')).addClass('weightClass').text(translate(data.details.weight_class.toLowerCase())),
                            $(document.createElement('div')).addClass('armorType').text(translate(data.details.type.toLowerCase()))
                        ]);
                    case('upgrade_component'):
                        return $(document.createElement('div'));
                    case('trophy'):
                        return $(document.createElement('div'));
                    case('trinket'):
                        return $(document.createElement('div'));
                    default:
                        return null;
                    break;
                }
            };
            console.log(data);
            $gw2tooltip.addClass(config.mode).addClass(data.rarity.toLowerCase()+'Item').html($bodyWrapper.html([
                $(document.createElement('img')).attr({height:32,width:32,alt:data.name,src:data.icon}), // no image url :(
                $(document.createElement('div')).addClass('headline').addClass(data.rarity.toLowerCase()).text(data.name),
                getType(data.type.toLowerCase()),
                $(document.createElement('div')).addClass('description').text(data.description),
                $(document.createElement('div')).addClass('level').text(translate('requiredlevel',data.level)),
                $(parseCoint(data.vendor_value))
            ]));
            positionItem();
        };

        // Load a item via ajax
        var loadItem = function(itemId) {
            $.ajax({
                dataType: 'json',
                //url: 'https://api.guildwars2.com/v1/item_details.json',
                url: 'https://api.guildwars2.com/v2/items/' + itemId,
                //data: {item_id:itemId,lang:config.language},
                beforeSend: function() {
                    $gw2tooltip.addClass('loading');
                },
                success: function(data) {
                    injectStyle(data);
                    if(config.localStorage && isStorageActiv) {
                        var activeStorage = JSON.parse(localStorage[localStorageName]);
                        activeStorage[data.id] = data;
                        localStorage[localStorageName] = JSON.stringify(activeStorage);
                    }
                    $gw2tooltip.removeClass('loading');
                    positionItem();
                },
                statusCode: {
                    500: function() {
                        $gw2tooltip.html($bodyWrapper.html(
                            $(document.createElement('div')).addClass('error').text(translate('errormessage500',itemId))
                        ));
                        $gw2tooltip.removeClass('loading');
                        positionItem();
                    }
                }
            });
        };
        var loadItemStorage = function(data) {
            injectStyle(data);
        };

        function translate(str, replacer) {
            var parse = typeof config.translate[config.language] != undefined && typeof config.translate[config.language][str] != undefined ? config.translate[config.language][str] : config.translate[defaultLanguage][str];
            return typeof replacer == undefined ? parse : parse.replace(/%s/g, replacer);
        }

        parseCoint = function(cointNumber) {
            /**
             * A JavaScript equivalent of PHP’s str_split
             * @see http://phpjs.org/functions/str_split/
             * @param string
             * @param split_length
             * @returns {*}
             */
            var str_split = function(string, split_length) {
                if (split_length === null) {
                    split_length = 1;
                }
                if (string === null || split_length < 1) {
                    return false;
                }
                string += '';
                var chunks = [],
                    pos = 0,
                    len = string.length;
                while (pos < len) {
                    chunks.push(string.slice(pos, pos += split_length));
                }
                return chunks;
            };

            /**
             * A JavaScript equivalent of PHP’s strrev
             * @see http://phpjs.org/functions/strrev/
             * @param string
             * @returns {string}
             */
            var strrev = function(string) {
                string = string + '';

                var grapheme_extend = /(.)([\uDC00-\uDFFF\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065E\u0670\u06D6-\u06DC\u06DE-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0901-\u0903\u093C\u093E-\u094D\u0951-\u0954\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C01-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C82\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D02\u0D03\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F90-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B6-\u17D3\u17DD\u180B-\u180D\u18A9\u1920-\u192B\u1930-\u193B\u19B0-\u19C0\u19C8\u19C9\u1A17-\u1A1B\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAA\u1C24-\u1C37\u1DC0-\u1DE6\u1DFE\u1DFF\u20D0-\u20F0\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA67C\uA67D\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C4\uA926-\uA92D\uA947-\uA953\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uFB1E\uFE00-\uFE0F\uFE20-\uFE26]+)/g;
                string = string.replace(grapheme_extend, '$2$1');
                return string.split('').reverse().join('');
            };
            var $html = $(document.createElement('div')).addClass('coins');
            var cointArr = str_split(strrev(cointNumber), 2);
            var $gold = $(document.createElement('span')).addClass('gold');
            for (var key=0;key<cointArr.length;key++) {
                if(key == 0) {
                    $html.prepend($(document.createElement('span')).addClass('copper').text(strrev(cointArr[key])))
                } else if(key == 1) {
                    $html.prepend($(document.createElement('span')).addClass('silver').text(strrev(cointArr[key])))
                } else {
                    $gold.text(strrev(cointArr[key])+''+$gold.text())
                }
            }
            return $gold.text().length ? $html.prepend($gold) : $html;
        };

        /* mouseenter event  */
        $selector.mouseenter(function() {
            if(!$(guildwars2tooltipId).length) {
                $('body').append($gw2tooltip);
            } else {
                $(guildwars2tooltipId).replaceWith($gw2tooltip);
            }
            var dataId = $(this).attr(config.dataTag);

            $gw2tooltip.addClass('active').empty();

            if(config.localStorage && isStorageActiv) {
                if(typeof localStorage[localStorageName] == undefined) {
                    localStorage[localStorageName] = JSON.stringify({});
                }
                if(typeof JSON.parse(localStorage[localStorageName])[dataId] == undefined) {
                    loadItem(dataId);
                } else {
                    loadItemStorage(JSON.parse(localStorage[localStorageName])[dataId]);
                }
            } else {
                loadItem(dataId);
            }

            /* item position */
            $(this).addClass('hover').mousemove(function(e) {
                positionEvent = e;
                positionItem();
            });
        });

        /* mouseleave event  */
        $selector.mouseleave(function() {
            $gw2tooltip.removeClass().removeAttr('style');
            $selector.removeClass('hover');
     });

        return this;
    };
})(jQuery);
