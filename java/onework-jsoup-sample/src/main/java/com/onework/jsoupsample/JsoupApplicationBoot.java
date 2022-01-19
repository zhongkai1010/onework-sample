package com.onework.jsoupsample;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;

/**
 * Hello world!
 *
 * @author Administrator
 */

public class JsoupApplicationBoot {
    public static void main(String[] args) throws IOException, InterruptedException {
        String urlTmp = "http://ts.voc.com.cn/question/index/index/page/%d.html";
        Integer pageMax = 100;
        for (int i = 1; i <= pageMax; i++) {
            String url = String.format(urlTmp, i);
            Document doc = Jsoup.connect(url).get();
            Elements newsHeadlines = doc.select(".ts_list1 a");
            for (Element headline : newsHeadlines) {
                log("%s -- %s", headline.text(), headline.absUrl("href"));
            }
            Thread.sleep(1000);
        }
    }

    private static void log(String msg, String... vals) {
        System.out.println(String.format(msg, vals));
    }
}
