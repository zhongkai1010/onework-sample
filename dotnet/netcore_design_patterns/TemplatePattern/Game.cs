﻿namespace netcore_design_patterns.TemplatePattern;

public abstract class Game
{
    protected abstract void initialize();

    protected abstract void startPlay();

    protected abstract void endPlay();


    //模板
    public void Play()
    {
        //初始化游戏
        initialize();

        //开始游戏
        startPlay();

        //结束游戏
        endPlay();
    }
}