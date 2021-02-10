

var cookies = document.cookie;
var cookiesArray = cookies.split('; ');

for(var c of cookiesArray) {
  var cArray = c.split('=');
  if(cArray[0] == 'name'){
    var userName = decodeURI(cArray[1]);
  } else if(cArray[0] == 'password') {
    var userPassword = cArray[1];
  }
}
if(!userName && !userPassword){
  location.href = '/login';
}

(()=>{
//投稿コメントコンポーネント
class PostedComments extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div>
        <ul>
          {this.props.comments.map(comment => {
            if(comment.extension == "jpg" || comment.extension == "png" || comment.extension == "gif"){
              const imagePath = "media/"+comment.fname+"."+comment.extension;
              return(
                <div className="comment_container" key={comment.id}>
                  <li>{comment.id}
                  <br />投稿名：{comment.name}
                  <br />コメント：{comment.contents}
                  <br />日付：{comment.date}
                  </li>
                  <img src={imagePath} className="postedMedia" />
                  <br />
                  <input type="button" value="削除" name={comment.id} onClick={this.props.delete} />
                  <input type="button" value="編集" name={comment.id} onClick={this.props.edit} />
                </div>
              );
            }else if(comment.extension == "mp4"){
              const videoPath = "media/"+comment.fname+"."+comment.extension;
              return(
                <div className="comment_container" key={comment.id}>
                  <li>{comment.id}
                  <br />投稿名：{comment.name}
                  <br />コメント：{comment.contents}
                  <br />日付：{comment.date}
                  </li>
                  <video src={videoPath} className="postedMedia" />
                  <br />
                  <input type="button" value="削除" name={comment.id} onClick={this.props.delete} />
                  <input type="button" value="編集" name={comment.id} onClick={this.props.edit} />
                </div>
              );
            }else{
              return(
                <div className="comment_container" key={comment.id}>
                  <li>{comment.id}
                  <br />投稿名：{comment.name}
                  <br />コメント：{comment.contents}
                  <br />日付：{comment.date}
                  </li>
                  <input type="button" value="削除" name={comment.id} onClick={this.props.delete} />
                  <input type="button" value="編集" name={comment.id} onClick={this.props.edit} />
                </div>
              );
            }
          })}
        </ul>
      </div>
    );
  }
}

//フォームコンポーネント
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: userName,
      contentsValue: '',
      passwordValue: userPassword,
      upfile: null,
      deleteNumber: '',
      editNumber: '',
      editForm: 'false',
      delIndex: '',
      editIndex: '',
      items: [],
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleContentsChange = this.handleContentsChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  componentDidMount() {
    const url = "http://localhost:8000/readData";
    axios.get(url).then((res) => {
      this.setState({ items: res.data.comments });
    });
  }

  handleNameChange(event) {
    this.setState({nameValue: event.target.value});
  }
  handleContentsChange(event) {
    this.setState({contentsValue: event.target.value});
  }
  handlePasswordChange(event) {
    this.setState({passwordValue: event.target.value});
  }
  handleFileChange(event) {
    this.setState({upfile: event.target.files[0]});
  }

  handleSubmit(event) {
    const submitData = new FormData;
    var upfile = document.getElementById('upfile');

    submitData.append("name", this.state.nameValue);
    submitData.append("contents", this.state.contentsValue);
    submitData.append("password", this.state.passwordValue);
    submitData.append("upfile", this.state.upfile);

    if(this.state.nameValue !== "" && this.state.contentsValue !== "" && this.state.passwordValue !== ""){
      axios
      .post('http://localhost:8000/', submitData, {
        headers: {'Content-type': 'multipart/form-data'}
      })
      .then((res) => {
        this.setState({ items: res.data.comments });
      });
      this.setState({nameValue: userName});
      this.setState({contentsValue: ''});
      this.setState({passwordValue: userPassword});
      this.setState({upfile: null});


    } else {

      alert('名前、コメント、パスワードのいずれかが入力されていません。');
      this.setState({nameValue: userName});
      this.setState({contentsValue: ''});
      this.setState({passwordValue: userPassword});
      upfile.value = '';
      this.setState({upfile: null});

    }
    event.preventDefault();
  }

  handleDelete(event) {
    const deleteNumber = {
      deleteNumber: event.target.name
    };
    var inputPass = prompt('パスワードを入力してください','');
    var index = this.state.items.findIndex(({id}) => id == deleteNumber.deleteNumber );
    var definedPass = this.state.items[index].password;

    if(inputPass == definedPass){
      axios.
      post('http://localhost:8000/deleteData',deleteNumber)
      .then((res)=> {
        this.setState({ items: res.data.comments });
      });
    } else {
      alert('パスワードが違います.')
    }

    event.preventDefault();
  }

  handleEdit(event) {
    this.setState({ editNumber: event.target.name});
    console.log(this.state.editNumber);
    var index = this.state.items.findIndex(({id}) => id == event.target.name );
    console.log(index);
    var editName = this.state.items[index].name;
    var editContents = this.state.items[index].contents;

    this.setState({ nameValue: editName });
    this.setState({ contentsValue: editContents });

    this.setState({ editForm: 'true'});

    event.preventDefault();
  }

  handleEditSubmit(event) {
    var editNumber = this.state.editNumber;
    var inputPass = prompt('パスワードを入力してください','');
    var index = this.state.items.findIndex(({id}) => id == editNumber );
    var definedPass = this.state.items[index].password;

    if(inputPass == definedPass){
      const comment = {
        id: this.state.editNumber,
        name: this.state.nameValue,
        contents: this.state.contentsValue,
      };
      axios.
      post('http://localhost:8000/editData',comment)
      .then((res)=> {
        this.setState({ items: res.data.comments });
      });
      this.setState({ editForm: 'false'});
      this.setState({nameValue: userName});
      this.setState({contentsValue: ''});
      this.setState({passwordValue: userPassword});
    } else {
      alert('パスワードが違います.');
      this.setState({ editForm: 'false'});
      this.setState({nameValue: userName});
      this.setState({contentsValue: ''});
      this.setState({passwordValue: userPassword});
    }

    event.preventDefault();
  }
  handleLogOut(event) {
    document.cookie = "name=; expires=0";
    document.cookie = "password=; expires=0";

    location.href = '/logout';
  }


  render() {
    if(this.state.editForm == 'false'){
      return (
        <div>
          <h2>投稿フォーム</h2>
          <form >
            <label>
              <p>投稿名</p>
              <input type="text" value={this.state.nameValue} onChange={this.handleNameChange} name="name" />
            </label>
            <label>
              <p>コメント</p>
              <textarea value={this.state.contentsValue} onChange={this.handleContentsChange} rows="8" cols="80" name="contents" />
            </label>
            <label>
              <p>パスワード</p>
              <input type="password" value={this.state.passwordValue} onChange={this.handlePasswordChange} name="password" />
            </label>
            <label>
              <p>ファイル</p>
              <input type="file" name="upfile" onChange={this.handleFileChange} id="upfile" />
            </label>
            <br /><br />
            <input type="button" value="投稿する" onClick={this.handleSubmit} />
          </form>
          <br /><br />
          <input type="button" value="ログアウト" onClick={this.handleLogOut} />
          <h2>投稿コメント</h2>
          <PostedComments comments={this.state.items} delete={this.handleDelete} edit={this.handleEdit} />
        </div>
      );
    } else {
      return(
        <div>
          <h2>編集フォーム</h2>
          <form >
            <label>
              <p>投稿名</p>
              <input type="text" value={this.state.nameValue} onChange={this.handleNameChange} name="name" />
            </label>
            <label>
              <p>コメント</p>
              <textarea value={this.state.contentsValue} onChange={this.handleContentsChange} rows="8" cols="80" name="contents" />
            </label>
            <br /><br />
            <input type="button" value="編集する" onClick={this.handleEditSubmit} />
          </form>
        </div>
      );
    }
  }
}

//コメント表示

ReactDOM.render(
  <Form />,
  document.getElementById('root')
);
})();
