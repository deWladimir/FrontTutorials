function config () {
    const _config = [
        {
            containerSearchType: "class",
            nodeName: "navigation-links",
            elementsToAppend: {
                type: "span",
                list: [
                    {
                        name: 'Features'
                    },
                    {
                        name: 'Pricing'
                    },
                    {
                        name: 'Help'
                    },
                    {
                        name: 'Blog'
                    },
                    {
                        name: 'About us'
                    }
                ]
            },
            simpleElement: true
        },
        {
            containerSearchType: "class",
            nodeName: "navigation-buttons",
            elementsToAppend: {
                type: "button",
                list: [
                    {
                        name: 'Log In'
                    },
                    {
                        name: 'Sign Up'
                    }
                ]
            },
            simpleElement: true
        },
        {
            containerSearchType: "class",
            nodeName: "two-stats-blocks",
            elementsToAppend: {
                type: "div",
                list: [
                    [ { name: 'Credit Limits' }, { name: '$10,000' } ],
                    [ { name: 'Monthly Spend' }, { name: '$5,827.00'} ]
                ]
            },
            simpleElement: false
        },
        {
            containerSearchType: "class",
            nodeName: "pay-history",
            elementsToAppend: {
                type: "div",
                list: [
                    [ { name: 'arrow-up', isImage: true }, { simpleElement: false, list: [ { name: 'McDonald\'s' }, { name: 'Today' } ], classList: 'shop-date'}, { name: '$50', classList: 'money-pay-history' } ],
                    [ { name: 'arrow-up', isImage: true }, { simpleElement: false, list: [ { name: 'Netflix' }, { name: 'Yesterday' } ], classList: 'shop-date'}, { name: '$120', classList: 'money-pay-history' } ],
                    [ { name: 'arrow-up', isImage: true }, { simpleElement: false, list: [ { name: 'Amazon' }, { name: 'Mon 12 Dec 2016' } ], classList: 'shop-date'}, { name: '$70', classList: 'money-pay-history' } ]
                ]
            },
            simpleElement: false
        },
        {
            containerSearchType: "class",
            nodeName: "mobile-footer",
            elementsToAppend: {
                type: "div",
                list: [
                    { name: 'home', isImage: true },
                    { name: 'plus', isImage: true },   
                    { name: 'uncle-sam', isImage: true}   
                ]
            },
            simpleElement: true
        }
    ];

    return {
        get: function () {
            return _config;
        }
    };
};

function getContainer (name, type) {
    let container = undefined;
    if (type == "class") {
        container = document.getElementsByClassName(name)[0];
    }

    return container;
}

function createElement(type, list, container, isSimpleElement = true) {
    list.forEach(el => {

        const element = document.createElement(type);
        if (Object.keys(el).includes('classList')) element.classList.add(el['classList']);

        const innerSimpleElementFlag = Object.keys(el).includes('simpleElement') ? el['simpleElement'] : true;

        if (isSimpleElement && innerSimpleElementFlag) {
            if (el["isImage"]) {   
                element.classList.add(el.name);
                const img = document.createElement("img");
                img.src = "assets/".concat(el.name).concat(".svg");
                img.alt = el.name;
                element.appendChild(img);
            } else {
                element.innerText = el.name;
            }
        } else if (isSimpleElement === false || innerSimpleElementFlag === false) {
            createElement(type, innerSimpleElementFlag === false ? el.list : el, element);
        }

        container.appendChild(element);
    });

}

function render() {
    const configuration = config().get();

    configuration.forEach(obj => {

        const container = getContainer(obj.nodeName, obj.containerSearchType);

        if (container) {
            const [type, list] = [obj.elementsToAppend.type, obj.elementsToAppend.list];
            createElement(type, list, container, obj.simpleElement);
        }

    });
}

document.addEventListener("DOMContentLoaded", render);
