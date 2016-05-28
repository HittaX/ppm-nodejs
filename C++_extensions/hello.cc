#include <node.h>
#include <v8.h>

// 引入v8命名空间
using namespace v8;

// sayHello方法的具体逻辑
Handle<Value> Method(const Arguments& args) {
    HandleScope scope;
    // 返回一个"Hello World!"字符串
    return scope.Close(String::New("Hello World!"));
}

// 初始化模块
void init(Handle<Object> target) {
    // 定义模块中的sayHello方法
    NODE_SET_METHOD(target, "sayHello", Method);
}

// 定义"hello"模块
NODE_MODULE(hello, init);