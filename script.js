/* Backone Model */
const Blog = Backbone.Model.extend({
  default: {
    author: '',
    title: '',
    url: '',
  },
});

/* Backbone Collection  */
/* Collection:Array of model */
const Blogs = Backbone.Collection.extend({});

/* create  blogs or collection */
const blog1 = new Blog({
  author: 'Irfan',
  title: "Irfan's Blog",
  url: 'https://www.urbandictionary.com/define.php?term=Irfan',
});

const blog2 = new Blog({
  author: 'Ansari',
  title: "Ansari's Blog",
  url: 'https://www.urbandictionary.com/define.php?term=Priyanka',
});

/* instantiate a collection */
const blogs = new Blogs();

/* Backbone view for one blog */
const BlogView = Backbone.View.extend({
  model: new Blog(),
  tagName: 'tr',
  initialize: function () {
    this.template = _.template($('.blogs-list-template').html());
  },
  events: {
    'click .edit-blog': 'edit',
    'click .update-blog': 'update',
    'click .cancel': 'cancel',
    'click .delete-blog': 'delete',
  },
  edit: function () {
    $('.edit-blog').hide();
    $('.delete-blog').hide();
    this.$('.update-blog').show();
    this.$('.cancel').show();

    const author = this.$('.author').html();
    const title = this.$('.title').html();
    const url = this.$('.url').html();
    this.$('.author').html(
      '<input type="text" class="form-control author-input" value=" ' +
        author +
        ' " >'
    );
    this.$('.title').html(
      '<input type="text" class="form-control title-input" value=" ' +
        title +
        ' " >'
    );
    this.$('.url').html(
      '<input type="text" class="form-control url-input" value=" ' +
        url +
        ' " >'
    );
  },

  update: function () {
    this.model.set('author', $('.author-update').val());
    this.model.set('title', $('.title-update').val());
    this.model.set('url', $('.url-update').val());
  },

  cancel: function () {
    blogsView.render();
  },
  
  delete: function () {
    this.model.destroy();
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
});

/* Backbone view for all blogs */
const BlogsView = Backbone.View.extend({
  model: blogs,
  el: $('.blogs-list'),
  initialize: function () {
    var self = this;
    this.model.on('add', this.render, this);
    this.model.on(
      'change',
      function () {
        setTimeout(() => {
          self.render();
        }, 3000);
      },
      this
    );
    this.model.on('remove', this.render, this);
  },
  render: function () {
    const self = this;
    this.$el.html('');
    _.each(this.model.toArray(), function (blog) {
      self.$el.append(new BlogView({ model: blog }).render().$el);
    });
    return this;
  },
});

/* instantiate blogs view */
const blogsView = new BlogsView();

/* doucument ready code i.e when document finish loading it will run */
$(document).ready(function () {
  $('.add-blog').on('click', function () {
    const blog = new Blog({
      author: $('.author-input').val(),
      title: $('.title-input').val(),
      url: $('.url-input').val(),
    });
    /* after adding clear the form */
    // console.log(blog.toJSON());
    $('.author-input').val('');
    $('.title-input').val('');
    $('.url-input').val('');
    blogs.add(blog);
  });
});
