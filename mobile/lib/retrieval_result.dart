import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:mobile/api.dart';

class RetrievalResult extends StatelessWidget {
  RetrievalResult({Key? key, @required this.data}) : super(key: key);

  final dynamic data;

  @override
  Widget build(BuildContext context) {
    print(data['paths']);

    List<String> paths =
        data['paths'].map<String>((item) => item.toString()).toList();

    return Scaffold(
      appBar: AppBar(),
      body: Column(
        children: [
          Spacer(flex: 1),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text(
              'Similiar Products:',
              style: Theme.of(context)
                  .textTheme
                  .headline1!
                  .copyWith(fontSize: 72.0),
            ),
          ),
          Spacer(flex: 1),
          Container(
            child: CarouselSlider(
              options: CarouselOptions(),
              items: paths
                  .map<Widget>(
                    (item) => Padding(
                      padding: EdgeInsets.symmetric(horizontal: 8.0),
                      child: Center(
                        child: Card(
                          color: Colors.white,
                          child: Image.network(
                              basePath + '/img/In-shop/Img/' + item,
                              fit: BoxFit.fitHeight,
                              width: 1000),
                        ),
                      ),
                    ),
                  )
                  .toList(),
            ),
          ),
          Spacer(flex: 5),
        ],
      ),
    );
  }
}
