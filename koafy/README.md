### 基于koa2的koafy框架


#### 一、Decorator控制Koa路由

- spring

```
@Controller
public class HelloController{
    @RequestMapping("/hello")
    String hello() {
        return "Hello World";  
    }
}

```
- falsk

```
@app.route("/hello")
def hello():
    return "Hello World"
```

- but Express或Koa上的路由

```
router.get('/hello', async ctx => {
    ctx.body = 'Hello World'
})
```

- 封装Koa路由

	


















