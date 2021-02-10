'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cookies = document.cookie;
var cookiesArray = cookies.split('; ');

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = cookiesArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var c = _step.value;

    var cArray = c.split('=');
    if (cArray[0] == 'name') {
      var userName = decodeURI(cArray[1]);
    } else if (cArray[0] == 'password') {
      var userPassword = cArray[1];
    }
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

if (!userName && !userPassword) {
  location.href = '/login';
}

//投稿コメントコンポーネント

var PostedComments = function (_React$Component) {
  _inherits(PostedComments, _React$Component);

  function PostedComments(props) {
    _classCallCheck(this, PostedComments);

    return _possibleConstructorReturn(this, (PostedComments.__proto__ || Object.getPrototypeOf(PostedComments)).call(this, props));
  }

  _createClass(PostedComments, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        null,
        React.createElement(
          'ul',
          null,
          this.props.comments.map(function (comment) {
            if (comment.extension == "jpg" || comment.extension == "png" || comment.extension == "gif") {
              var imagePath = "media/" + comment.fname + "." + comment.extension;
              return React.createElement(
                'div',
                { className: 'comment_container', key: comment.id },
                React.createElement(
                  'li',
                  null,
                  comment.id,
                  React.createElement('br', null),
                  '\u6295\u7A3F\u540D\uFF1A',
                  comment.name,
                  React.createElement('br', null),
                  '\u30B3\u30E1\u30F3\u30C8\uFF1A',
                  comment.contents,
                  React.createElement('br', null),
                  '\u65E5\u4ED8\uFF1A',
                  comment.date
                ),
                React.createElement('img', { src: imagePath, className: 'postedMedia' }),
                React.createElement('br', null),
                React.createElement('input', { type: 'button', value: '\u524A\u9664', name: comment.id, onClick: _this2.props.delete }),
                React.createElement('input', { type: 'button', value: '\u7DE8\u96C6', name: comment.id, onClick: _this2.props.edit })
              );
            } else if (comment.extension == "mp4") {
              var videoPath = "media/" + comment.fname + "." + comment.extension;
              return React.createElement(
                'div',
                { className: 'comment_container', key: comment.id },
                React.createElement(
                  'li',
                  null,
                  comment.id,
                  React.createElement('br', null),
                  '\u6295\u7A3F\u540D\uFF1A',
                  comment.name,
                  React.createElement('br', null),
                  '\u30B3\u30E1\u30F3\u30C8\uFF1A',
                  comment.contents,
                  React.createElement('br', null),
                  '\u65E5\u4ED8\uFF1A',
                  comment.date
                ),
                React.createElement('video', { src: videoPath, className: 'postedMedia' }),
                React.createElement('br', null),
                React.createElement('input', { type: 'button', value: '\u524A\u9664', name: comment.id, onClick: _this2.props.delete }),
                React.createElement('input', { type: 'button', value: '\u7DE8\u96C6', name: comment.id, onClick: _this2.props.edit })
              );
            } else {
              return React.createElement(
                'div',
                { className: 'comment_container', key: comment.id },
                React.createElement(
                  'li',
                  null,
                  comment.id,
                  React.createElement('br', null),
                  '\u6295\u7A3F\u540D\uFF1A',
                  comment.name,
                  React.createElement('br', null),
                  '\u30B3\u30E1\u30F3\u30C8\uFF1A',
                  comment.contents,
                  React.createElement('br', null),
                  '\u65E5\u4ED8\uFF1A',
                  comment.date
                ),
                React.createElement('input', { type: 'button', value: '\u524A\u9664', name: comment.id, onClick: _this2.props.delete }),
                React.createElement('input', { type: 'button', value: '\u7DE8\u96C6', name: comment.id, onClick: _this2.props.edit })
              );
            }
          })
        )
      );
    }
  }]);

  return PostedComments;
}(React.Component);

//フォームコンポーネント


var Form = function (_React$Component2) {
  _inherits(Form, _React$Component2);

  function Form(props) {
    _classCallCheck(this, Form);

    var _this3 = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

    _this3.state = {
      nameValue: userName,
      contentsValue: '',
      passwordValue: userPassword,
      upfile: null,
      deleteNumber: '',
      editNumber: '',
      editForm: 'false',
      delIndex: '',
      editIndex: '',
      items: []
    };

    _this3.handleNameChange = _this3.handleNameChange.bind(_this3);
    _this3.handleContentsChange = _this3.handleContentsChange.bind(_this3);
    _this3.handlePasswordChange = _this3.handlePasswordChange.bind(_this3);
    _this3.handleFileChange = _this3.handleFileChange.bind(_this3);
    _this3.handleSubmit = _this3.handleSubmit.bind(_this3);
    _this3.handleDelete = _this3.handleDelete.bind(_this3);
    _this3.handleEdit = _this3.handleEdit.bind(_this3);
    _this3.handleEditSubmit = _this3.handleEditSubmit.bind(_this3);
    _this3.handleLogOut = _this3.handleLogOut.bind(_this3);
    return _this3;
  }

  _createClass(Form, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this4 = this;

      var url = "http://localhost:8000/readData";
      axios.get(url).then(function (res) {
        _this4.setState({ items: res.data.comments });
      });
    }
  }, {
    key: 'handleNameChange',
    value: function handleNameChange(event) {
      this.setState({ nameValue: event.target.value });
    }
  }, {
    key: 'handleContentsChange',
    value: function handleContentsChange(event) {
      this.setState({ contentsValue: event.target.value });
    }
  }, {
    key: 'handlePasswordChange',
    value: function handlePasswordChange(event) {
      this.setState({ passwordValue: event.target.value });
    }
  }, {
    key: 'handleFileChange',
    value: function handleFileChange(event) {
      this.setState({ upfile: event.target.files[0] });
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      var _this5 = this;

      var submitData = new FormData();
      var upfile = document.getElementById('upfile');

      submitData.append("name", this.state.nameValue);
      submitData.append("contents", this.state.contentsValue);
      submitData.append("password", this.state.passwordValue);
      submitData.append("upfile", this.state.upfile);

      if (this.state.nameValue !== "" && this.state.contentsValue !== "" && this.state.passwordValue !== "") {
        axios.post('http://localhost:8000/', submitData, {
          headers: { 'Content-type': 'multipart/form-data' }
        }).then(function (res) {
          _this5.setState({ items: res.data.comments });
        });
        this.setState({ nameValue: userName });
        this.setState({ contentsValue: '' });
        this.setState({ passwordValue: userPassword });
        this.setState({ upfile: null });
      } else {

        alert('名前、コメント、パスワードのいずれかが入力されていません。');
        this.setState({ nameValue: userName });
        this.setState({ contentsValue: '' });
        this.setState({ passwordValue: userPassword });
        upfile.value = '';
        this.setState({ upfile: null });
      }
      event.preventDefault();
    }
  }, {
    key: 'handleDelete',
    value: function handleDelete(event) {
      var _this6 = this;

      var deleteNumber = {
        deleteNumber: event.target.name
      };
      var inputPass = prompt('パスワードを入力してください', '');
      var index = this.state.items.findIndex(function (_ref) {
        var id = _ref.id;
        return id == deleteNumber.deleteNumber;
      });
      var definedPass = this.state.items[index].password;

      if (inputPass == definedPass) {
        axios.post('http://localhost:8000/deleteData', deleteNumber).then(function (res) {
          _this6.setState({ items: res.data.comments });
        });
      } else {
        alert('パスワードが違います.');
      }

      event.preventDefault();
    }
  }, {
    key: 'handleEdit',
    value: function handleEdit(event) {
      this.setState({ editNumber: event.target.name });
      console.log(this.state.editNumber);
      var index = this.state.items.findIndex(function (_ref2) {
        var id = _ref2.id;
        return id == event.target.name;
      });
      console.log(index);
      var editName = this.state.items[index].name;
      var editContents = this.state.items[index].contents;

      this.setState({ nameValue: editName });
      this.setState({ contentsValue: editContents });

      this.setState({ editForm: 'true' });

      event.preventDefault();
    }
  }, {
    key: 'handleEditSubmit',
    value: function handleEditSubmit(event) {
      var _this7 = this;

      var editNumber = this.state.editNumber;
      var inputPass = prompt('パスワードを入力してください', '');
      var index = this.state.items.findIndex(function (_ref3) {
        var id = _ref3.id;
        return id == editNumber;
      });
      var definedPass = this.state.items[index].password;

      if (inputPass == definedPass) {
        var comment = {
          id: this.state.editNumber,
          name: this.state.nameValue,
          contents: this.state.contentsValue
        };
        axios.post('http://localhost:8000/editData', comment).then(function (res) {
          _this7.setState({ items: res.data.comments });
        });
        this.setState({ editForm: 'false' });
        this.setState({ nameValue: userName });
        this.setState({ contentsValue: '' });
        this.setState({ passwordValue: userPassword });
      } else {
        alert('パスワードが違います.');
        this.setState({ editForm: 'false' });
        this.setState({ nameValue: userName });
        this.setState({ contentsValue: '' });
        this.setState({ passwordValue: userPassword });
      }

      event.preventDefault();
    }
  }, {
    key: 'handleLogOut',
    value: function handleLogOut(event) {
      document.cookie = "name=; expires=0";
      document.cookie = "password=; expires=0";

      location.href = '/logout';
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.editForm == 'false') {
        return React.createElement(
          'div',
          null,
          React.createElement(
            'h2',
            null,
            '\u6295\u7A3F\u30D5\u30A9\u30FC\u30E0'
          ),
          React.createElement(
            'form',
            null,
            React.createElement(
              'label',
              null,
              React.createElement(
                'p',
                null,
                '\u6295\u7A3F\u540D'
              ),
              React.createElement('input', { type: 'text', value: this.state.nameValue, onChange: this.handleNameChange, name: 'name' })
            ),
            React.createElement(
              'label',
              null,
              React.createElement(
                'p',
                null,
                '\u30B3\u30E1\u30F3\u30C8'
              ),
              React.createElement('textarea', { value: this.state.contentsValue, onChange: this.handleContentsChange, rows: '8', cols: '80', name: 'contents' })
            ),
            React.createElement(
              'label',
              null,
              React.createElement(
                'p',
                null,
                '\u30D1\u30B9\u30EF\u30FC\u30C9'
              ),
              React.createElement('input', { type: 'password', value: this.state.passwordValue, onChange: this.handlePasswordChange, name: 'password' })
            ),
            React.createElement(
              'label',
              null,
              React.createElement(
                'p',
                null,
                '\u30D5\u30A1\u30A4\u30EB'
              ),
              React.createElement('input', { type: 'file', name: 'upfile', onChange: this.handleFileChange, id: 'upfile' })
            ),
            React.createElement('br', null),
            React.createElement('br', null),
            React.createElement('input', { type: 'button', value: '\u6295\u7A3F\u3059\u308B', onClick: this.handleSubmit })
          ),
          React.createElement('br', null),
          React.createElement('br', null),
          React.createElement('input', { type: 'button', value: '\u30ED\u30B0\u30A2\u30A6\u30C8', onClick: this.handleLogOut }),
          React.createElement(
            'h2',
            null,
            '\u6295\u7A3F\u30B3\u30E1\u30F3\u30C8'
          ),
          React.createElement(PostedComments, { comments: this.state.items, 'delete': this.handleDelete, edit: this.handleEdit })
        );
      } else {
        return React.createElement(
          'div',
          null,
          React.createElement(
            'h2',
            null,
            '\u7DE8\u96C6\u30D5\u30A9\u30FC\u30E0'
          ),
          React.createElement(
            'form',
            null,
            React.createElement(
              'label',
              null,
              React.createElement(
                'p',
                null,
                '\u6295\u7A3F\u540D'
              ),
              React.createElement('input', { type: 'text', value: this.state.nameValue, onChange: this.handleNameChange, name: 'name' })
            ),
            React.createElement(
              'label',
              null,
              React.createElement(
                'p',
                null,
                '\u30B3\u30E1\u30F3\u30C8'
              ),
              React.createElement('textarea', { value: this.state.contentsValue, onChange: this.handleContentsChange, rows: '8', cols: '80', name: 'contents' })
            ),
            React.createElement('br', null),
            React.createElement('br', null),
            React.createElement('input', { type: 'button', value: '\u7DE8\u96C6\u3059\u308B', onClick: this.handleEditSubmit })
          )
        );
      }
    }
  }]);

  return Form;
}(React.Component);

//コメント表示

ReactDOM.render(React.createElement(Form, null), document.getElementById('root'));