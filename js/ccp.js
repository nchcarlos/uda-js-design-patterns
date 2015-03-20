(function() {
    var catAdminView, catDetailView, catListView, catModels, catClickerController;

    /**
     * The app controller
     */
    catClickerController = {
        adminMode: false,
        currentViewDetailModel: null,

        init: function() {
            this.currentViewDetailModel = catModels.items[0];
            catAdminView.init();
            catListView.init();
            catDetailView.init();
        },

        adminBtnClickHandler: function() {
            this.toggleAdminMode();
        },

        detailViewClickHandler: function() {
            this.incrementCatClickCnt();
            catDetailView.render(this.currentViewDetailModel);
            catAdminView.render();
        },

        getListText: function() {
            return catModels.getTitles();
        },

        getModels: function() {
            return catModels.items;
        },

        incrementCatClickCnt: function() {
            this.currentViewDetailModel.clickCnt++;
        },

        listClickEvent: function(model) {
            this.currentViewDetailModel = model;
            catDetailView.render(this.currentViewDetailModel);
            catAdminView.render();
        },

        onAdminCancel: function() {
            catAdminView.render();
        },

        onAdminSave: function() {
            var model = catClickerController.currentViewDetailModel,
                newVals = catAdminView.getFormValues(),
                i;

            for (i = 0; i < newVals.length; i++) {
                switch (newVals[i].name) {
                    case 'title':
                        model.title = newVals[i].value;
                        break;
                    case 'image':
                        model.image = newVals[i].value;
                        break;
                    case 'clicks':
                        model.clickCnt = newVals[i].value;
                        break;
                }
            }
            catListView.init();
            catDetailView.render();
        },

        toggleAdminMode: function() {
            this.adminMode = !this.adminMode;
            if (this.adminMode) {
                catAdminView.show();
            }
            else {
                catAdminView.hide();
            }
        }
    };

    /**
     * This is our data
     */
    catModels = {
        items: [{
            id: 'lonely-kit',
            title: 'A lonely kitten',
            image: 'img/lonely-kit.jpg',
            clickCnt: 0
        },{
            id: 'dramatic-cat',
            title: 'A dramatic cat',
            image: 'img/dramatic-cat.jpg',
            clickCnt: 0
        },{
            id: 'two-kits',
            title: 'Two sleepy kittens',
            image: 'img/two-kits.jpg',
            clickCnt: 0
        },{
            id: 'angry-kit',
            title: 'One angry kitten',
            image: 'img/angry-kit.jpg',
            clickCnt: 0
        }],

        getTitles: function() {
            var titles = [];

            $.each(this.items, function(idx, item) {
                if (item.title) {
                  titles.push(item.title);
                }
            });
            return titles;
        }
    };

    catAdminView = {
        el: $('#ccAdminView'),
        form: $('form[name="ccAdminForm"]:first'),

        init: function() {
            this.title = this.form.children('input[name="title"]:first');
            this.imgUrl = this.form.children('input[name="image"]:first');
            this.clickCnt = this.form.children('input[name="clicks"]:first');
            this.el.children('button[name="save"]:first')
                    .click(catClickerController.onAdminSave);
            this.el.children('button[name="cancel"]:first')
                    .click(catClickerController.onAdminCancel);
            this.setFormValues();
            this.hide();
        },

        getFormValues: function() {
            return this.form.serializeArray();
        },

        hide: function() {
            this.el.hide();
        },

        render: function() {
            this.setFormValues();
        },

        setFormValues: function() {
            var model = catClickerController.currentViewDetailModel;

            if (model.title) {
                this.title.val(model.title);
            }
            if (model.image) {
                this.imgUrl.val(model.image);
            }
            if (isNaN(model.clickCnt)) {
                model.clickCnt = 0;
            }
            this.clickCnt.val(model.clickCnt);
        },

        show: function() {
            this.el.show();
        }
    },

    catDetailView = {
        elTitle: $('#ccDetTitle'),
        elImg: $('#ccDetImg'),
        elClickCnt: $('#ccDetClickCnt'),
        elAdminBtn: $('button[name="admin"]:first'),

        init: function() {
            this.elImg.click(function() {
                catClickerController.detailViewClickHandler();
            });
            this.elAdminBtn.click(function() {
                catClickerController.adminBtnClickHandler();
            });
            this.render();
        },

        render: function() {
            var model = catClickerController.currentViewDetailModel;

            if (model.title) {
                this.elTitle.html(model.title);
            }
            if (model.image) {
                this.elImg.attr('src', model.image);
            }
            if (isNaN(model.clickCnt)) {
                model.clickCnt = 0;
            }
            this.updateClickCnt(model.clickCnt);
        },

        updateClickCnt: function(cnt) {
            var spanHtml = cnt;

            spanHtml += cnt !== 1 ? ' times!' : ' time!';
            this.elClickCnt.children('span:first').html(spanHtml);
        }
    };

    /**
     *
     */
    catListView = {
        el: $('#ccCatList'),

        init: function() {
            this.el.empty();
            this.render();
        },

        render: function() {
            var me = this,
                models = catClickerController.getModels();

            $.each(models, function(idx, model) {
                me.el.append(me.renderListItem(model));
            });
        },

        renderListItem: function(model) {
            if (model.title) {
                return $('<li>' + model.title + '</li>').click(function() {
                    catClickerController.listClickEvent(model);
                });
            }
            else {
                return '';
            }
        },
    };

    catClickerController.init();
}());
